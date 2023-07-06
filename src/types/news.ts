export type NewsPayload = {
    facet_fields: string;
    facet_filter: string;
    fl: string;
    q: string;
    "api-key": string;
}

export type Headline = {
    main: string;
    kicker: string | null;
    content_kicker: string | null;
    print_headline: string | null;
    name: string | null;
    seo: string | null;
    sub: string | null;
}

export type Keyword = {
    name: string;
    value: string;
    rank: number;
    major: string;
}

export type Document = {
    abstract: string;
    web_url: string;
    snippet: string;
    lead_paragraph: string;
    source: string;
    headline: Headline;
    keywords: Keyword[];
    word_count: number;
}

export type Response = {
    docs: Document[];
    meta: {
        hits: number;
        offset: number;
        time: number;
    };
}

export type NewsAPIResponse = {
    status: string;
    copyright: string;
    response: Response;
}
