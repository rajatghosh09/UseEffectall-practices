import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
const categoryList = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

interface News {
  urlToImage: string,
  title: string,
  url: string,
  description: string
}

const NewsApi = () => {
  const [category, setCategory] = useState("");
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const apiKey = "9fd0b1812846425dabb6fd37785334e5";
  //   const Api = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
  //   console.log("api", Api);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
        );
        // console.log("response", response?.data);
        setNewsList(response?.data?.articles);
      } catch (error: any) {
        // console.log("error", error?.response?.data?.message);
        setError(error?.response?.data?.message)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, apiKey]);
  console.log("news list", newsList);
  console.log("seletecd", category);

  if (loading) return <p>Loading....</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div>
      <div className="flex flex-row gap-2 mb-3 mt-4">
        <h2>News</h2>
        <select
          name="category"
          id=""
          className="border border-black-600"
          value={category}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setCategory(e.target.value)
          }
        >
          <option value="">----select category----</option>
          {categoryList?.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        {newsList?.map((news, index) => (
          <div
            key={index}
            className="flex flex-col border border-black-200 mb-2"
          >
            <img src={news.urlToImage} alt={news.title} className="w-50 h-50" />
            <h4>Title: {news.title}</h4>
            <p>Desc: {news.description}</p>
            <a href={news.url} className="text-blue-500">
              link
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsApi;
