import axios from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

interface Post {
    id?: string;
    title?: string;
    body?: string;
}

// interface Post {
//     data: {
//         id?: string;
//         title?: string;
//         body?: string;
//     }
// }

const PaginationPage = () => {

    // hold arrey 
    const [postList, setPostList] = useState<Post[]>([]);
    //  const [postList, setPostList] = useState<Post | null>(null);

    //search area for found 
    const [query, setQuery] = useState("");
    

    //next or prev page for navigate
    const [page, setPage] = useState(1);

    //using for how many show in display inisital 5 are show
    const [limit, setLimit] = useState("5");

    // for loading
    const [loading, setLoading] = useState(false);

    const fetchPost = async () => {
        setLoading(true);
        try {
            const Response = await axios.get(
                `https://jsonplaceholder.typicode.com/posts?q=${query}&_page=${page}&_limit=${limit}`
            );

            console.log(Response);  
            setPostList(Response?.data);
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [query, page, limit]);
    
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(query);
    };

    return (
        <>
            <div className="p-5">
                <form onSubmit={handleSubmit}>
                    <input
                        className="border border-black "
                        placeholder="Enter Query"
                        type="text"
                        name="name"
                        value={query}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setQuery(e.target.value)
                        }
                    />

                    <button type="submit" className="border border-black p-2">
                        Search
                    </button>
                </form>

                {postList.length > 0 ? (
                    loading ? (
                        <p>loading....</p>
                    ) : (
                        <div className="mt-3">
                            {postList?.map((post) => (
                                <div key={post.id} className="border border-black p-4 mb-4">
                                    <h5>{post.title}</h5>
                                    <p>{post.body}</p>
                                </div>
                            ))}
                        </div>
                    )) : (
                    <div>
                        <p>No Data found!!</p>
                    </div>
                )}

                <div className="flex gap-4 justify-center items-center">
                    <button className="border border-black p-2" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
                    {page}
                    <button className="border border-black p-2" onClick={() => setPage(page + 1)} disabled={postList.length === 0}>Next</button> 

                    <select name="" id="" className="border border-black p-2" value={limit} onChange={(e: ChangeEvent<HTMLSelectElement>) => setLimit(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default PaginationPage;
