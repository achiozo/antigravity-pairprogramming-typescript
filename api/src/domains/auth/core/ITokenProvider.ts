export interface ITokenProvider {
    create(payload: object): string;
    verify(token: string): string;
    decode(token: string): any;
    isValid(token: string): boolean;
}
