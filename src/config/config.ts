export class Config {
  public static readonly DATABASE: string = 'mongodb://localhost:27017/my-app';
  public static readonly PORT: number = 3000;
  public static readonly JWT_SECRET_KEY: string =
    '458e9a9fba274e1a642b72dcea41a6c7c9a209088e9a54e9f7c3f654273735db';
  public static readonly JWT_SESSION_EXPIRY: string = '5d';
}
