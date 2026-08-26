import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import BookModal from "./components/BookModal";
import SkeletonLoader from "./components/SkeletonLoader";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Selected book for details modal
  const [selectedBook, setSelectedBook] = useState(null);
  const searchRequestRef = useRef(null);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("bookFinderTheme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply dark class to html element when theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("bookFinderTheme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("bookFinderTheme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const searchBooks = async (query, searchType, sortBy) => {
    if (!query) return;

    searchRequestRef.current?.abort();
    const requestController = new AbortController();
    searchRequestRef.current = requestController;

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);

      // Construct API query parameters for Open Library
      const params = {
        limit: 24,
      };

      if (searchType === "title") {
        params.title = query;
      } else if (searchType === "author") {
        params.author = query;
      } else if (searchType === "subject") {
        params.subject = query;
      } else {
        params.q = query;
      }

      if (sortBy === "newest") {
        params.sort = "new";
      }

      const response = await axios.get(
        `https://openlibrary.org/search.json`,
        { params, signal: requestController.signal }
      );

      const docs = response.data.docs || [];
      const mappedBooks = docs.map((doc) => ({
        id: doc.key,
        volumeInfo: {
          title: doc.title,
          subtitle: doc.subtitle || null,
          authors: doc.author_name || null,
          publisher: doc.publisher ? doc.publisher[0] : null,
          publishedDate: doc.first_publish_year ? String(doc.first_publish_year) : null,
          pageCount: doc.number_of_pages_median || doc.number_of_pages || null,
          language: doc.language ? doc.language[0] : null,
          categories: doc.subject ? [doc.subject[0]] : ["General"],
          imageLinks: doc.cover_i ? {
            thumbnail: `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`,
            smallThumbnail: `https://covers.openlibrary.org/b/id/${doc.cover_i}-S.jpg`
          } : (doc.isbn && doc.isbn.length > 0 ? {
            thumbnail: `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-M.jpg`,
            smallThumbnail: `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-S.jpg`
          } : null),
          previewLink: `https://openlibrary.org${doc.key}`,
          description: doc.first_sentence ? doc.first_sentence[0] : null
        }
      }));

      setBooks(mappedBooks);
    } catch (err) {
      if (axios.isCancel(err)) return;

      console.error("Search API error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch books from Open Library. Please check your internet connection and try again."
      );
      setBooks([]);
    } finally {
      if (searchRequestRef.current === requestController) {
        searchRequestRef.current = null;
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <SearchBar searchBooks={searchBooks} />

      {/* Error banner display */}
      {error && (
        <div className="error-banner container">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div className="error-banner-content">
            <h4>Something went wrong</h4>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Main content display: loading skeleton, empty state or grid list */}
      {loading ? (
        <div className="container" style={{ padding: "40px 0" }}>
          <SkeletonLoader count={8} />
        </div>
      ) : (
        hasSearched && (
          <BookList
            books={books}
            onSelectBook={setSelectedBook}
          />
        )
      )}

      {/* Default intro guide before any search */}
      {!hasSearched && !loading && (
        <div className="empty-state container animate-fade-in" style={{ borderStyle: "solid" }}>
          <span className="empty-icon" role="img" aria-label="Book emoji">📖</span>
          <h3>Welcome to BookFinder</h3>
          <p>Search by book title, author, or subject above to begin exploring.</p>
          
          <div className="quote-card animate-fade-in">
            <span className="quote-mark">“</span>
            <p className="quote-text">I have always imagined that Paradise will be a kind of library.</p>
            <p className="quote-author">— Jorge Luis Borges</p>
          </div>
        </div>
      )}

      {/* Book details Modal */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

export default App;