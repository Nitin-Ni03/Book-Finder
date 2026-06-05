import BookCard from "./BookCard";

const BookList = ({ books, onSelectBook }) => {
  if (!books || books.length === 0) {
    return (
      <div className="empty-state container animate-fade-in" id="empty-state">
        <span className="empty-icon" role="img" aria-label="Book pile">📚</span>
        <h3>No Books Found</h3>
        <p>Try searching for a different title, author, or keyword, or change your search filter.</p>
      </div>
    );
  }

  return (
    <div className="book-grid-container container">
      <div className="results-summary animate-fade-in">
        <span>Found {books.length} matching books</span>
      </div>

      <div className="book-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onSelectBook={onSelectBook}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;