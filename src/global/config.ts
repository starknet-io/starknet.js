import { DEFAULT_GLOBAL_CONFIG } from './constants';

type DefaultConfig = typeof DEFAULT_GLOBAL_CONFIG;
type CustomConfig = { [key: string]: any };

type ConfigData = DefaultConfig & CustomConfig;

class Configuration {
  private static instance: Configuration;

  private config!: ConfigData;

  private constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.config = { ...DEFAULT_GLOBAL_CONFIG };
  }

  public static getInstance(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
    }
    return Configuration.instance;
  }

  /**
   * Get a nested value from an object using a dot-notation path
   * @param obj - The object to traverse
   * @param path - The dot-notation path (e.g., 'a.b.c')
   * @returns The value at the path, or undefined if not found
   */
  private getNestedValue(obj: any, path: string): any {
    const keys = path.split('.');
    return keys.reduce((current, key) => {
      if (current === null || current === undefined) {
        return undefined;
      }
      return current[key];
    }, obj);
  }

  /**
   * Set a nested value in an object using a dot-notation path
   * @param obj - The object to modify
   * @param path - The dot-notation path (e.g., 'a.b.c')
   * @param value - The value to set
   */
  private setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop()!;

    const target = keys.reduce((current, key) => {
      if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
        // eslint-disable-next-line no-param-reassign
        current[key] = {};
      }
      return current[key];
    }, obj);

    target[lastKey] = value;
  }

  public get<K extends keyof DefaultConfig>(key: K): DefaultConfig[K];
  public get(key: string, defaultValue?: any): any;
  public get(key: string, defaultValue?: any) {
    // Check if it's a nested path (contains a dot)
    if (key.includes('.')) {
      const value = this.getNestedValue(this.config, key);
      return value ?? defaultValue;
    }
    return this.config[key] ?? defaultValue;
  }

  public set<K extends keyof DefaultConfig>(key: K, value: DefaultConfig[K]): void;
  public set(key: string, value: any): void;
  public set(key: string, value: any): void {
    // Check if it's a nested path (contains a dot)
    if (key.includes('.')) {
      this.setNestedValue(this.config, key, value);
    } else {
      this.config[key] = value;
    }
  }

  public update(configData: Partial<DefaultConfig> & CustomConfig): void {
    this.config = {
      ...this.config,
      ...configData,
    };
  }

  public getAll(): ConfigData {
    return { ...this.config };
  }

  public reset(): void {
    this.initialize();
  }

  public delete<K extends keyof DefaultConfig>(key: K): void;
  public delete(key: string): void;
  public delete(key: string): void {
    delete this.config[key];
  }

  public hasKey<K extends keyof DefaultConfig>(key: K): boolean;
  public hasKey(key: string): boolean;
  public hasKey(key: string): boolean {
    return key in this.config;
  }
}

// Export a single instance
export const config = Configuration.getInstance();
