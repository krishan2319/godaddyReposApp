# GoDaddy GitHub Explorer 🛠

A React app to explore GoDaddy's public GitHub repositories.

## 🚀 How to Run

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd godaddy-repos-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

4. **Run tests:**
   ```bash
   npm test
   ```

## ✅ Features
- Paginated list of GoDaddy repositories (10 per page)
- Repo detail page with:
  - Title
  - Description
  - Repository URL
  - Languages
  - Forks, Issues, Watchers
- Responsive UI with Material-UI
- State management with React Query
- Tests with React Testing Library

## 📦 Tech Stack
- React 18
- Material-UI
- Axios
- React Router DOM
- React Query (TanStack Query)
- Jest + RTL

## 📌 Notes
- **Material-UI**: For fast, accessible, and beautiful UI components with easy theming and responsiveness.
- **React Query**: For simple, robust data fetching, caching, and background updates.
- **Axios**: For concise, promise-based HTTP requests and easy API integration.
- **React Router DOM**: For clean, declarative routing and navigation between list/detail views.
- **Jest + React Testing Library**: For reliable, user-focused component testing with minimal setup.
- GitHub’s API pagination is used with fallback logic.
- Language API may not be populated for some repos.

## ✨ Future Improvements
- Add search/filter
- GitHub link header pagination
- Lazy loading languages

---

_Made by Krishan_