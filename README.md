# GoDaddy GitHub Explorer 🛠

A modern React app to explore GoDaddy's public GitHub repositories with enhanced 3D UI effects and responsive design.

## 🌐 Live Demo

**[View Live App](https://krishan-godaddy-repos-app.onrender.com/)**

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

### 🎨 Enhanced UI & UX
- **3D Card Effects**: Interactive cards with perspective transforms and hover animations
- **Responsive Design**: Optimized for mobile, tablet, and desktop (xs/sm/lg breakpoints)
- **Modern Pagination**: Shows 9 repositories per page in a clean 3×3 grid layout
- **Gradient Backgrounds**: Beautiful multi-layered gradients with radial overlays
- **Smooth Animations**: Staggered loading animations and smooth transitions
- **GoDaddy Branding**: Official logo.png integration with GitHub icons for repositories

### 📊 Repository Features
- **Repository Grid**: Responsive grid layout (1-3 columns based on screen size)
- **Rich Repository Cards**:
  - GitHub icons and repository names
  - Descriptions with smart truncation
  - Star count, forks, watchers, and language tags
  - Enhanced hover effects with 3D transforms
- **Detailed Repository View**:
  - Two-column responsive layout
  - Statistics sidebar with color-coded metrics
  - Language breakdown with percentages
  - Repository info (visibility, branch, dates, size)
  - Action buttons (GitHub link, clone URL copy)

### 🛠 Technical Features
- **State Management**: React Query for efficient data fetching and caching
- **Responsive UI**: Material-UI with custom CSS enhancements
- **Accessibility**: Support for reduced motion, high contrast, and focus states
- **Performance**: Optimized animations and lazy loading
- **Testing**: Comprehensive tests with React Testing Library

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
