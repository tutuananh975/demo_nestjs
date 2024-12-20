export interface Config {
    swagger: SwaggerConfig;
    appConfig: AppConfig;
}

export interface SwaggerConfig {
    tag: string;
    enabled: boolean;
    title: string;
    description: string;
    version: string;
    path: string;
}

export interface AppConfig {
    publicAPI: Set<string>;
}
