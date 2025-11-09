import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const DeboundSearch = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  //using for input query
  const [debouceQuery, setDebounceQurey] = useState(query);


  useEffect(() => {
    const time = setTimeout(() => {
      setDebounceQurey(query);
    }, 500);

    return () => clearTimeout(time);
  }, [query]);

  useEffect(() => {
    if (debouceQuery.trim() === "") {
      setPostList([]);
      return;
    }
    const deboundSearch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?title_like=${debouceQuery}`
        );
        console.log(response);

        setPostList(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    deboundSearch();
  }, [debouceQuery]);

  // useEffect(() => {
  //     deboundSearch()
  //     const setTimeData = setTimeout(() => {
  //         deboundSearch()
  //     }, 2000);
  //     return () => clearTimeout(setTimeData)
  // }, [query])

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault()
  //     console.log(query)
  // }

  return (
    <>
      <div className="p-5">
        {/* <form onSubmit={handleSubmit} className='mb-2'> */}
        <input
          type="text"
          value={query}
          name="name"
          className="border border-black p-2"
          placeholder="Search here"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />

        {/* <button type='submit' className='p-2 bg-blue-600 text-white border border-black rounded ml-2'>Search</button> */}
        {/* </form> */}

        {/* {postList.length > 0 ? (
                    loading ? (
                        <div className="flex items-center justify-center h-scree">
                            <LoaderCircle className="animate-[spin_1.5s_linear_infinite] w-10 h-10 mb-3" />
                            <p className="text-lg font-semibold">Loading...</p>
                        </div>
                    ) : ( */}
        {loading && (
          <div className="flex items-center justify-center h-scree">
            <LoaderCircle className="animate-[spin_1.5s_linear_infinite] w-10 h-10 mb-3" />
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        )}
        <div>
          {postList?.map((elem, idx) => (
            <div
              className=" border border-black p-3 mb-2 flex"
              key={elem.id || idx}
            >
              <div className="flex flex-col">
                <div className="flex mb-2">
                  <span className="font-bold">{elem.id}.</span>
                  <span className="font-bold">{elem.title}</span>
                </div>
                <p>{elem.body}</p>
              </div>
            </div>
          ))}
        </div>
        {!loading && postList.length === 0 && (
          <div>
            <p>No data found!</p>
          </div>
        )}
        {/* )
                ) : (
                    <div>
                        <p>No data found!</p>
                    </div>
                )} */}
      </div>
    </>
  );
};

export default DeboundSearch;
