import React from "react";
import "./LiveSearchResults.css";

const LiveSearchResults = ({ results, onClick }) => {
  return (
    <ul className="live-search-results">
      {results.map((result) => (
        <li key={result.id} onClick={() => onClick(result)}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${result.poster_path}`}
            alt={result.title}
            className="poster"
          />
          {result.title}
        </li>
      ))}
    </ul>
  );
};

export default LiveSearchResults;
