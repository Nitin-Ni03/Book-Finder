import { useState, useEffect } from "react";
import axios from "axios";

const BookModal = ({ book, onClose }) => {
  const [description, setDescription] = useState("Loading description...");

  useEffect(() => {
    // Disable body scroll when modal is open
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (!book) return;

    let isMounted = true;
    const fetchDescription = async () => {
      try {
        setDescription("Loading description...");
        // book.id contains the Open Library work key, e.g. "/works/OL27479W"
        const response = await axios.get(`https://openlibrary.org${book.id}.json`);
        if (isMounted) {
          const desc = response.data.description;
          if (desc) {
            if (typeof desc === "object" && desc.value) {
              setDescription(desc.value);
            } else if (typeof desc === "string") {
              setDescription(desc);
            } else {
              setDescription("No description available.");
            }
          } else {
            setDescription("No description available.");
          }
        }
      } catch (err) {
        console.error("Failed to fetch book description:", err);
        if (isMounted) {
          // Fallback to existing first_sentence if available
          setDescription(book.volumeInfo.description || "No description available.");
        }
      }
    };

    fetchDescription();
    return () => {
      isMounted = false;
    };
  }, [book]);

  if (!book) return null;

  const info = book.volumeInfo;

  // Helper to strip HTML/Markdown-like tags from description if any
  const stripHtml = (htmlString) => {
    if (!htmlString) return "No description available.";
    return htmlString.replace(/<[^>]*>/g, "");
  };

  const coverUrl = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content animate-fade-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btn-close-modal"
          onClick={onClose}
          aria-label="Close modal"
          id="btn-close-modal"
        >
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-body">
          <div className="modal-cover-column">
            <div className="modal-cover-wrapper">
              {coverUrl ? (
                <img src={coverUrl} alt={info.title} />
              ) : (
                <div className="book-cover-fallback">
                  <span className="fallback-spine">BOOK</span>
                  <h4 className="fallback-title">{info.title}</h4>
                  <p className="fallback-author">
                    {info.authors ? info.authors[0] : "Unknown"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="modal-info-column">
            <h2 className="modal-title">{info.title}</h2>
            {info.subtitle && (
              <h3
                className="modal-subtitle"
                style={{
                  fontSize: "16px",
                  color: "var(--text-secondary)",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                {info.subtitle}
              </h3>
            )}
            <p className="modal-authors">
              By {info.authors ? info.authors.join(", ") : "Unknown Author"}
            </p>

            <div className="modal-meta-grid">
              <div className="meta-item">
                <div className="meta-label">Publisher</div>
                <div className="meta-value">{info.publisher || "N/A"}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Published Date</div>
                <div className="meta-value">{info.publishedDate || "N/A"}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Page Count</div>
                <div className="meta-value">
                  {info.pageCount ? `${info.pageCount} pages` : "N/A"}
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Language</div>
                <div className="meta-value">
                  {info.language ? info.language.toUpperCase() : "N/A"}
                </div>
              </div>
            </div>

            <h4 className="modal-section-title">Description</h4>
            <div className="modal-description">
              <p>{stripHtml(description)}</p>
            </div>

            <div className="modal-actions">
              {info.previewLink && (
                <a
                  href={info.previewLink}
                  target="_blank"
                  rel="noreferrer"
                  className="modal-btn modal-btn-primary"
                  id="btn-preview-link"
                  style={{ width: "100%" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Preview Book on Open Library
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
