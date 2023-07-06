import API from "@/services/API";

const endpoints = {
    getNews: () => API.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?facet_fields=day_of_week&facet_filter=true&fl=abstract%2Cweb_url%2Csnippet%2Clead_paragraph%2Csource%2Cword_count%2Ckeywords%2Cheadline&page=1&q=yaaa&api-key=Ivb0pYFlx6ZI551ukQ809H0zQpHUdYA2")
}

export {endpoints}