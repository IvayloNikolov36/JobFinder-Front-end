import { environment } from "../../../environments/environment";

const route: string = environment.apiUrl;

export const getAds = (): string => route + 'ads';
export const getAd = (id: number) => route + `ads/${id}`;
export const createAd = (): string => route + 'ads/create';
export const getEngagementsUrl = (): string => route + 'jobEngagements';
export const getCategoriesUrl = (): string => route + 'jobCategories';
