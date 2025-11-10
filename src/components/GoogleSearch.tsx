import axios from "axios";
import { useEffect, useState } from "react";

const GoogleSearch = () => {
  const [query, setquery] = useState("");
  const [mainData, setmainData] = useState([]);

  const findData = async () => {
      if (!query.trim()) {
        setmainData([]);
        return;
        }

    try {
      const response = await axios.get(
        `https://api.datamuse.com/sug?s=${query}`
      );
      console.log(response);
      // setquery(response.data)
      setmainData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findData();
  }, [query]);

  const handleClick = (i) => {
    setquery(i);
    setmainData([]);
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setquery(e.target.value)}
        placeholder="Search Somthing"
        className="border border-black"
      />

      {mainData.map((elem, idx) => (
        <li key={idx} onClick={() => handleClick(elem.word)}>
          {elem.word}
        </li>
      ))}
    </>
  );
};

export default GoogleSearch;
