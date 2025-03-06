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

  public get<K extends keyof DefaultConfig>(key: K): DefaultConfig[K];
  public get(key: string, defaultValue?: any): any;
  public get(key: string, defaultValue?: any) {
    return this.config[key] ?? defaultValue;
  }

  public set<K extends keyof DefaultConfig>(key: K, value: DefaultConfig[K]): void;
  public set(key: string, value: any): void;
  public set(key: string, value: any): void {
    this.config[key] = value;
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
