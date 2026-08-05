# Book Finder

Book Finder is a modern React web app that helps users discover books from the Open Library dataset. It offers advanced search filters, a responsive interface, a detailed book preview modal, and dark mode support.

## 🌟 Key Features

- **Flexible search** by title, author, subject, or general query
- **Sort results** by relevance or newest publications
- **Book detail modal** with publisher, pages, publish year, language, and description
- **Cover art support** with fallback display for missing covers
- **Skeleton loader UI** while fetching search results
- **Dark mode toggle** with preference saved to local storage
- **Responsive layout** for desktop and mobile browsing
- **Error handling** and friendly empty states

## 🧩 What the App Does

- Sends search requests to the Open Library API at `https://openlibrary.org/search.json`
- Maps API results into a book card grid with cover image, title, author, and category
- Fetches detailed book descriptions using the Open Library work endpoint via the selected book key
- Keeps theme choice between light and dark modes using `localStorage`
- Shows a “No Books Found” state when the query returns no results

## 🛠️ Technology Stack

- **React 19**
- **Vite**
- **Axios**
- **CSS3**
- **Open Library API**

## 📁 Project Structure

```
book-finder/
├── public/                      # Public static files
├── src/
│   ├── assets/                  # Static image assets
│   ├── components/              # Reusable UI components
│   │   ├── BookCard.jsx         # Book card with cover, title, author, and details button
│   │   ├── BookList.jsx         # Grid and empty-state rendering for search results
│   │   ├── BookModal.jsx        # Modal showing detailed book metadata and description
│   │   ├── Navbar.jsx           # App header with dark mode toggle
│   │   ├── SearchBar.jsx        # Search bar with filters and sort options
   │   └── SkeletonLoader.jsx    # Placeholder loader skeletons while fetching
│   ├── App.jsx                  # Main app component and search logic
│   ├── main.jsx                 # React entry point
│   ├── App.css                  # Core styling for layout and components
│   └── index.css                # Global base styles and theme variables
├── .gitignore
├── eslint.config.js             # ESLint configuration
├── index.html                   # Vite HTML template
├── package.json                 # Dependencies and scripts
├── README.md                    # Project documentation
└── vite.config.js               # Vite build config
```

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-finder
```
2. Install dependencies:
```bash
npm install
```
3. Start development server:
```bash
npm run dev
```

Open the app at the local URL shown in the terminal.

## 🚀 Usage

1. Enter text in the search field
2. Select a search type: all fields, title, author, or subject
3. Choose sort order: relevance or newest
4. Click **Search**
5. Click a book card or the details button to open the modal
6. Toggle theme with the moon/sun button in the navbar

## 📌 Available Scripts

- `npm run dev` — start the Vite development server
- `npm run build` — build a production bundle
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint checks

## 🔌 API Details

This app uses the Open Library API:

- Search endpoint: `https://openlibrary.org/search.json`
- Work details endpoint: `https://openlibrary.org{workKey}.json`
- No API key required

### Search query behavior

- `title` searches book titles
- `author` searches author fields
- `subject` searches subjects/genres
- `q` performs a general query across available fields
- uses `limit=24` results per request
- `sort=new` is applied when the user selects newest

## 🎨 Styling and UX

- Responsive card grid layout
- Dark/light theming with CSS variables
- Skeleton loader on fetch
- Accessible buttons and labels
- Modal overlay with scroll lock while open

## 📘 Notes

- Some books may not include publisher, page count, or language data
- The modal attempts to fetch a richer description from the Open Library work endpoint
- If cover images are unavailable, the app displays a styled fallback cover

## 🤝 Contributing

Contributions are welcome. Feel free to open issues or submit pull requests.

## 📄 License

Open source for learning and personal use.
