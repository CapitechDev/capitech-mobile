export interface Article {
  source: { id: string | null; name: string | null };
  author: string | null;
  title: string | null;
  description: string | null;
  url: string | null;
  urlToImage: string | null;
  publishedAt: string | null;
  content: string | null;
}

export interface NewsArticle {
  status: string;
  totalResults: number;
  articles: Article[];
}