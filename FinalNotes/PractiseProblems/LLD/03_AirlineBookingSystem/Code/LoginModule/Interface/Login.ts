export interface Login {
    login(credentials: any, logInStrategy: Login): void;
}