import { useState } from "react";

const SearchBar = ({ searchBooks }) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    // Trigger parent search action
    searchBooks(trimmedQuery, searchType, sortBy);
  };

  return (
    <div className="search-container container animate-fade-in">
      <h2 className="search-title">Discover Your Next Book</h2>
      <p className="search-subtitle">
        Search millions of titles, authors, and subjects using Open Library API.
      </p>

      <div className="search-wrapper">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-input-container">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search by title, author, key phrases..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="search-input"
            />
          </div>

          <button type="submit" id="btn-search-submit">
            <span>Search</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
      </div>

      {/* Advanced Filters */}
      <div className="search-controls animate-fade-in">
        <select
          className="select-control"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          title="Search Type"
          id="select-search-type"
        >
          <option value="all">All Fields</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="subject">Subject / Genre</option>
        </select>

        <select
          className="select-control"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          title="Sort By"
          id="select-sort-by"
        >
          <option value="relevance">Sort by: Relevance</option>
          <option value="newest">Sort by: Newest</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;