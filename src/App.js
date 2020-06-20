import React, { useContext, useState, useEffect } from "react";
import "./styles.css";

const themeContext = React.createContext(null);

export default function App() {
  const [theme, setTheme] = useState("red");
  const data = useFetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=aabc900afb7001d796df7806b6284bf1"
  );
  return (
    <themeContext.Provider value={theme}>
      <button onClick={() => setTheme("green")}>Change Theme</button>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <ChildComponent />
        {data && <PopularMovies movies={data.results} />}
      </div>
    </themeContext.Provider>
  );
}

export const PopularMovies = ({ movies }) => {
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
};

export const ChildComponent = () => {
  const theme = useContext(themeContext);
  return <h1 style={{ color: theme }}>Child Component</h1>;
};

const useFetch = function(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const databuffer = await fetch(url).then(response => response.json());
      setData(databuffer);
    })();
  }, [url]);
  return data;
};
