declare const _default: () => {
    port: number;
    nodeEnv: string;
    jwt: {
        accessTokenSecretExpiresIn: string;
        refreshTokenExpiresIn: string;
        accessTokenSecret: string;
        refreshTokenSecret: string;
    };
    salt: number;
    upload: {
        dir: string;
        fileSizeMax: number;
    };
};
export default _default;
