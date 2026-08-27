import { Signature } from '../types';
import { Signer } from './default';
import { SignerInterface } from './interface';

export class ExternalSigner extends Signer implements SignerInterface {
  private readonly pubkey: () => Promise<string>;

  private readonly signHash: (hash: string) => Promise<Signature>;

  constructor(pubkey: () => Promise<string>, signHash: (hash: string) => Promise<Signature>) {
    super();
    this.pubkey = pubkey;
    this.signHash = signHash;
  }

  public async getPubKey(): Promise<string> {
    return this.pubkey();
  }

  protected async signRaw(hash: string): Promise<Signature> {
    return this.signHash(hash);
  }
}
