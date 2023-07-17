import React from "react";
import "./LiveSearchResults.css";

const LiveSearchResults = ({ results, onClick }) => {
  return (
    <ul className="live-search-results">
      {results.map((result) => (
        <li key={result.id} onClick={() => onClick(result)}>
          {result.title}
        </li>
      ))}
    </ul>
  );
};

export default LiveSearchResults;
