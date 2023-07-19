import API from "@/services/API";
import {NewsPayload} from "@/types/news";
import qs from 'querystring'
import {NewsAPIResponse} from "../../types/news";

export const getNewsAPI = (payload: NewsPayload): Promise<NewsAPIResponse> => {
    const query: string = qs.stringify(payload as any)

    const res = API.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${query}`)
    return res
}