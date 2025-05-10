export const config = {
    url: {
        frontend: import.meta.env.VITE_FRONT_URL || 'http://localhost:3000',
        backend: import.meta.env.VITE_BACK_URL || 'http://localhost:3001',
    },
    appName: import.meta.env.VITE_APP_NAME || 'MyApp',
    environment: import.meta.env.VITE_ENVIRONMENT || 'development',
    port: parseInt(import.meta.env.VITE_PORT || '3000', 10) || 3000,
    versions: {
        versionOne: "/v1",
        versionTwo: "/v2",
    },
    auth : {
        jwt : { secret: import.meta.env.VITE_JWT_SECRET || 'secret' },
        redirectURL : {
            login : '/auth/login',
            verify : '/auth/verify',
            logout : '/auth/logout',

        },
    },
};
