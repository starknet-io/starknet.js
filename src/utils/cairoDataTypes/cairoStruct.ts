import type { AbiStruct } from '../../types';
import assert from '../assert';
import type { ParsingStrategy, VariantType } from '../calldata';
import { CairoOption } from '../calldata/enum';
import { addCompiledFlag } from '../helpers';
import { getNext } from '../num';
import { CairoType } from './cairoType.interface';
import { CairoTypeOption } from './cairoTypeOption';
import { CairoFelt252 } from './felt';

export class CairoStruct extends CairoType {
  public readonly dynamicSelector: string;

  public readonly content: CairoType[];

  public readonly abiStruct: AbiStruct;

  constructor(content: unknown, abiStruct: AbiStruct, strategy: ParsingStrategy) {
    super();
    this.dynamicSelector = abiStruct.name;
    this.abiStruct = abiStruct;
    if (content && typeof content === 'object' && 'next' in content) {
      // "content" is an iterator
      const parsedContent: CairoType[] = CairoStruct.parser(
        content as Iterator<string>,
        abiStruct,
        strategy
      );
      this.content = parsedContent;
      return;
    }
    if (content instanceof CairoStruct) {
      this.content = content.content;
      this.abiStruct = content.abiStruct;
      this.dynamicSelector = content.dynamicSelector;
      return;
    }
    CairoStruct.validate(content, abiStruct);
    const structContentType: string[] = CairoStruct.getStructMembersTypes(abiStruct);
    const resultContent: any[] = CairoStruct.extractValuesArray(content).map(
      (contentItem: any, index: number) => {
        if (
          contentItem &&
          typeof contentItem === 'object' &&
          contentItem !== null &&
          'toApiRequest' in contentItem
        ) {
          // "content" is a CairoType
          return contentItem as CairoType;
        }
        if (contentItem instanceof CairoOption) {
          // "content" is a CairoOption
          return new CairoTypeOption(contentItem, structContentType[index], strategy);
        }

        // TODO: add CairoResult

        // not an iterator, not an CairoType, neither a CairoType -> so is low level data (BigNumberish, array, object)

        const constructor = strategy.constructors[structContentType[index]];
        if (constructor) {
          return constructor(contentItem, strategy, structContentType[index]);
        }
        const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
        const matchingSelector = dynamicSelectors.find(([, selectorFn]) =>
          selectorFn(structContentType[index])
        );
        if (matchingSelector) {
          const [selectorName] = matchingSelector;
          const dynamicConstructor = strategy.constructors[selectorName];
          if (dynamicConstructor) {
            return dynamicConstructor(contentItem, strategy, structContentType[index]);
          }
        }
        throw new Error(`"${structContentType[index]}" is not a valid Cairo type`);
      }
    );
    this.content = resultContent;
  }

  private static parser(
    responseIterator: Iterator<string>,
    abiStruct: AbiStruct,
    strategy: ParsingStrategy
  ): CairoType[] {
    const elementTypes: string[] = CairoStruct.getStructMembersTypes(abiStruct);

    return elementTypes.map((elementType: string) => {
      const constructor = strategy.constructors[elementType];
      if (constructor) {
        return constructor(responseIterator, strategy, elementType);
      }

      // Check dynamic selectors (includes CairoArray, CairoFixedArray, CairoTuple, etc.)
      const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
      const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(elementType));

      if (matchingSelector) {
        const [selectorName] = matchingSelector;
        const dynamicConstructor = strategy.constructors[selectorName];
        if (dynamicConstructor) {
          return dynamicConstructor(responseIterator, strategy, elementType);
        }
      }

      // Unknown type - fallback to felt252 constructor
      const feltConstructor = strategy.constructors[CairoFelt252.abiSelector];
      if (feltConstructor) {
        return feltConstructor(responseIterator, strategy, elementType);
      }

      // If even felt252 constructor is not available, collect raw value for error handling
      const rawValue = getNext(responseIterator);
      return rawValue as unknown as CairoType;
    });
  }

  static validate(input: unknown, abiStruct?: AbiStruct): void {
    assert(
      Array.isArray(input) || (typeof input === 'object' && input !== null),
      `Invalid input: expected Array or Object, got ${typeof input}`
    );
    if (!abiStruct) return; // cannot validate without ABI
    assert(abiStruct.type === 'struct', `Invalid ABI: expected struct, got ${abiStruct.type}`);
    const lengthInput = Array.isArray(input) ? input.length : Object.keys(input).length;
    assert(
      abiStruct.members.length === lengthInput,
      `Invalid input: expected ${abiStruct.members.length} members, got ${lengthInput}`
    );
  }

  static is(data: any, _type?: string, _variant?: VariantType): boolean {
    try {
      CairoStruct.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  static isAbiType(_type: string): boolean {
    // A Cairo struct type (it's name) do not include any special pattern allowing to identify it directly.
    return true;
  }

  private static extractValuesArray(input: unknown): any[] {
    if (Array.isArray(input)) {
      return input;
    }
    const inputObj = input as Record<string | number, any>;
    return Object.values(inputObj);
  }

  private static getStructMembersTypes(type: AbiStruct): string[] {
    return type.members.map((member) => member.type);
  }

  public static extractStructMembersNames(type: AbiStruct): string[] {
    return type.members.map((member) => member.name);
  }

  toApiRequest(): string[] {
    const result = this.content.flatMap((element) => element.toApiRequest());
    return addCompiledFlag(result);
  }

  public decompose(strategy: ParsingStrategy): Object {
    const structContentType = CairoStruct.getStructMembersTypes(this.abiStruct);
    const result = this.content.map((element: CairoType, index: number) => {
      // For raw string values (unsupported types), throw error
      if (typeof element === 'string') {
        const elementType =
          typeof structContentType[index] === 'string'
            ? (structContentType[index] as string)
            : (structContentType[index] as any).type;
        throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
      }
      let parserName: string = structContentType[index] as string;
      if (element instanceof CairoType) {
        if (Object.hasOwn(element, 'dynamicSelector')) {
          // dynamic recursive CairoType
          parserName = (element as any).dynamicSelector;
        }
      }
      const responseParser = strategy.response[parserName];
      if (responseParser) {
        return responseParser(element, strategy);
      }
      // No response parser found - throw error instead of fallback magic
      throw new Error(
        `No response parser found for element type: ${structContentType[index]} in parsing strategy`
      );
    });
    const struct: Record<string, any> = {};
    result.forEach((el, index) => {
      struct[this.abiStruct.members[index].name] = el;
    });
    return struct;
  }
}
