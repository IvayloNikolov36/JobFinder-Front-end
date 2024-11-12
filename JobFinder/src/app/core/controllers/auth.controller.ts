import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl;

export const loginUrl = (): string => route + 'login';
export const registerCompanyUrl = (): string => route + 'register/company';
export const registerUserUrl = (): string => route + 'register/user';
