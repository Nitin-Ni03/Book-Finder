const BookCard = ({ book, onSelectBook }) => {
  const info = book.volumeInfo;
  const coverUrl = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail;
  const firstAuthor = info.authors ? info.authors[0] : "Unknown Author";
  const category = info.categories ? info.categories[0] : "General";

  return (
    <div className="book-card animate-fade-in" id={`book-card-${book.id}`}>
      <div className="book-cover-container">
        {coverUrl ? (
          <img src={coverUrl} alt={info.title} loading="lazy" />
        ) : (
          <div className="book-cover-fallback">
            <span className="fallback-spine">BOOK</span>
            <h4 className="fallback-title">{info.title}</h4>
            <p className="fallback-author">{firstAuthor}</p>
          </div>
        )}

        {/* Hover overlay for quick interactions */}
        <div className="card-overlay">
          <button
            className="overlay-btn"
            onClick={() => onSelectBook(book)}
            title="Quick view book details"
            id={`btn-quickview-${book.id}`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Quick View
          </button>
        </div>
      </div>

      <div className="book-info">
        <h3>{info.title}</h3>
        <p className="author">{info.authors ? info.authors.join(", ") : "Unknown Author"}</p>

        <div className="card-footer">
          <span className="book-category">{category}</span>
          <button
            className="btn-details"
            onClick={() => onSelectBook(book)}
            id={`btn-details-${book.id}`}
          >
            <span>Details</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;