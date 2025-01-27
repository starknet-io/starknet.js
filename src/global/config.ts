type ConfigData = {
  legacyMode: boolean;
  logLevel: string;
  [key: string]: any;
};

class Configuration {
  private static instance: Configuration;

  private config!: ConfigData;

  private constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.config = {
      legacyMode: false,
      logLevel: 'INFO',
    };
  }

  public static getInstance(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
    }
    return Configuration.instance;
  }

  public get<K extends keyof ConfigData>(
    key: K,
    defaultValue?: ConfigData[K]
  ): ConfigData[K] | undefined {
    return this.config[key] ?? defaultValue;
  }

  public set<K extends keyof ConfigData>(key: K, value: ConfigData[K]): void {
    this.config[key] = value;
  }

  public update(configData: Partial<ConfigData>): void {
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

  public delete(key: keyof ConfigData): void {
    delete this.config[key];
  }

  public hasKey(key: keyof ConfigData): boolean {
    return key in this.config;
  }
}

// Export a single instance
export const config = Configuration.getInstance();
