# Book Finder

A modern, responsive web application for discovering and exploring millions of books using the Open Library API. Search by title, author, or subject, and get detailed information about books with a beautiful user interface.

## 🌟 Features

- **Advanced Search**: Search books by title, author, subject, or general keywords
- **Multiple Search Options**: Filter results by different search types and sort by relevance or newest
- **Book Details Modal**: View comprehensive information about any book including authors, publishers, page count, publication date, and more
- **Book Cover Display**: View book covers with fallback design for books without covers
- **Skeleton Loading**: Beautiful loading state with skeleton screens for better UX
- **Dark Mode**: Toggle between light and dark themes with persistent preference storage
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Local Storage**: Saves user theme preferences for a personalized experience
- **Lazy Loading**: Optimized image loading for better performance
- **No Results Handling**: User-friendly messages when no books are found

## 🛠️ Technology Stack

- **React 19**: Modern UI library for building interactive components
- **Vite**: Fast build tool and development server
- **Axios**: HTTP client for API requests
- **CSS3**: Custom styling with CSS variables and animations
- **Open Library API**: Free API for accessing book data

### Development Tools
- **ESLint**: Code quality and consistency checks
- **Vite**: For bundling and hot module replacement during development

## 📦 Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd book-finder
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 🚀 Usage

1. **Open the Application**: Navigate to the local development URL
2. **Search for Books**: Enter your search query in the search bar
3. **Choose Search Type**: Select whether you want to search by title, author, subject, or general keywords
4. **Sort Results**: Choose to sort by relevance or newest publications
5. **View Details**: Click on any book card to see detailed information
6. **Toggle Theme**: Use the dark mode toggle in the navigation bar

### Example Searches
- Title: "The Great Gatsby"
- Author: "J.K. Rowling"
- Subject: "science fiction"
- General: "machine learning"

## 📂 Project Structure

```
book-finder/
├── src/
│   ├── components/
│   │   ├── BookCard.jsx          # Individual book card component
│   │   ├── BookList.jsx          # Grid of book cards
│   │   ├── BookModal.jsx         # Detailed book information modal
│   │   ├── Navbar.jsx            # Navigation bar with theme toggle
│   │   ├── SearchBar.jsx         # Search form with filters
│   │   └── SkeletonLoader.jsx    # Loading placeholder components
│   ├── App.jsx                   # Main application component
│   ├── main.jsx                  # React entry point
│   ├── App.css                   # Main styling
│   ├── index.css                 # Global styles
│   └── assets/                   # Static assets
├── public/                        # Public static files
├── vite.config.js                # Vite configuration
├── eslint.config.js              # ESLint configuration
├── package.json                  # Project dependencies
├── index.html                    # HTML template
└── README.md                      # This file
```

## 📜 Available Scripts

- **`npm run dev`**: Start development server with hot reload
- **`npm run build`**: Build optimized production bundle
- **`npm run preview`**: Preview production build locally
- **`npm run lint`**: Check code quality with ESLint

## 🔌 API Information

This project uses the **Open Library API**, a free, open-source book API:

- **API Endpoint**: `https://openlibrary.org/search.json`
- **No Authentication Required**: Free to use without API keys
- **Rate Limiting**: Reasonable rate limits for development/personal use
- **Documentation**: [Open Library API Docs](https://openlibrary.org/dev/docs/api)

### Search Parameters
- `title`: Search by book title
- `author`: Search by author name
- `subject`: Search by subject/genre
- `q`: General search across all fields
- `limit`: Number of results (default: 24)
- `sort`: Sort order ('new' for newest, default is by relevance)

## 🎨 Styling Features

- **CSS Variables**: Custom color system for easy theming
- **Dark Mode**: Automatic dark mode support with manual toggle
- **Animations**: Smooth fade-in animations for better visual feedback
- **Responsive Grid**: Auto-adjusting book card grid layout
- **Accessibility**: Semantic HTML and ARIA labels

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## 📄 License

This project is open source and available for personal and educational use.

## 🔗 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Open Library API](https://openlibrary.org/dev/docs/api)
- [Axios Documentation](https://axios-http.com)
