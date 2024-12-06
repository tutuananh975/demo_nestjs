import type { Config } from './config.interface';

const config: Config = {
    swagger: {
        enabled: true,
        title: 'Fellows API',
        description: 'API document for fellows BackEnd API',
        version: '0.1',
        path: 'api',
    },
    appConfig: {
        publicAPI: new Set<string>(['/auth/register', '/auth/login']),
    },
};

export default (): Config => config;
