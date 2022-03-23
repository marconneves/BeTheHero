declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'production';
      PORT?: string;
    }
  }
}

export {};
