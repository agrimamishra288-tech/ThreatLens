## ThreatLens - Cyber Threat Intelligence & Awareness Platform 

Project Details


**Student Name** -  Agrima Mishra

**Roll Number** - 2501010207 

**Course** - B.Tech CSE — Section B 

**Subject** - Web Development 2 — Capstone Project 


---

##  What is ThreatLens?

**ThreatLens** is a full-featured, client-side **Cyber Threat Intelligence (CTI) web application** built to make cybersecurity information accessible, interactive, and educational for everyday users. In a world where cyber attacks are growing more sophisticated every day — from phishing emails to ransomware — most people lack the tools and knowledge to protect themselves.

ThreatLens bridges that gap by providing:
- A searchable, categorized database of real-world cyber threats
- Interactive analytics dashboards to visualize threat landscapes
- A rule-based Scam Message Analyzer to detect suspicious text
- A Cybersecurity Quiz to test and reinforce user knowledge
- A Knowledge Base with clear explanations of common attack types
- A Bookmarks system to save threats for later review

**Why it's needed:** Cybersecurity awareness is the #1 defense against most attacks. ThreatLens turns complex threat intelligence into an accessible, educational experience — no prior security knowledge required.

---

## ✨ Features

###  Home Page
- Hero section with animated gradient background and a global search bar
- Quick Knowledge Base cards (Malware, Phishing, Ransomware) with expandable details and defense tips
- Quick navigation links to all major sections of the app

###  Threat Explorer
- Browse and search a curated dataset of real-world cyber threats
- Filter threats by **category** (Malware, Ransomware, Phishing, etc.) and **severity** (Critical, High, Medium, Low)
- Each threat displayed as a responsive card with severity badge, category tag, and "View Details" button

###  Threat Detail Page
- Deep-dive view of any individual threat
- Shows full description, affected systems, severity, category, and recommended mitigation strategies
- Bookmark/unbookmark threats directly from the detail page

###  Analytics Dashboard
- **Donut/Pie Chart** — Visualizes threat distribution across categories
- **Bar Chart** — Shows severity distribution (Critical / High / Medium / Low)
- **Quick Stats Panel** — Total threats, critical count, number of categories, system health
- Built with **Recharts** for responsive, animated data visualizations

###  Scam Message Analyzer
- Paste any suspicious email, SMS, or message into the analyzer
- A **rule-based keyword engine** scans for 15+ high-risk patterns (e.g., "OTP", "bank account", "lottery", "urgent", "social security")
- Returns a **risk score (0–100%)** with a circular progress indicator
- Color-coded verdict:  Appears Safe /  Proceed with Caution /  Highly Suspicious
- Highlights matched keywords inline within the message text

###  Cybersecurity Quiz
- 5-question multiple-choice quiz covering core cybersecurity concepts
- Topics include: Ransomware, Phishing, Password Security, MFA, Zero-Day Vulnerabilities
- Visual progress bar tracks advancement through the quiz
- Instant feedback: correct answers highlighted green, wrong answers highlighted red
- Final score screen with performance-based feedback and retake option

### Knowledge Base
- Dedicated page with structured educational cards for key cybersecurity threats
- Topics include: Malware, Phishing, Ransomware, Social Engineering, DDoS, Zero-Day, and more
- Each card includes a description and practical defense strategies

##   Bookmarks
- Save any threat card to your personal bookmarks list
- Bookmarks are persisted in **Redux state** (session-persistent)
- Manage your reading list — view and remove bookmarks from a dedicated page

###  Dark / Light Mode
- Full dark mode support across every page and component
- Theme preference managed globally via Redux and applied to the `<html>` element

---

##  Project Architecture

```
ThreatLens/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   └── Navbar.jsx      # Top navigation bar with theme toggle
│   │   ├── UI/
│   │   │   └── Loader.jsx      # Fullscreen loading spinner
│   │   └── ThreatCard.jsx      # Reusable threat card component
│   ├── hooks/
│   │   └── useFetchThreats.js  # Custom hook for threat data fetching/state
│   ├── pages/
│   │   ├── Home.jsx            # Landing page with search & quick knowledge base
│   │   ├── ThreatExplorer.jsx  # Browsable & filterable threat list
│   │   ├── ThreatDetail.jsx    # Individual threat detail view
│   │   ├── Dashboard.jsx       # Analytics dashboard with charts
│   │   ├── ScamAnalyzer.jsx    # Rule-based scam message analyzer
│   │   ├── Quiz.jsx            # Interactive cybersecurity quiz
│   │   ├── KnowledgeBase.jsx   # Educational threat knowledge cards
│   │   └── Bookmarks.jsx       # Saved/bookmarked threats
│   ├── store/
│   │   ├── store.js            # Redux store configuration
│   │   ├── bookmarksSlice.js   # Bookmarks state (add/remove)
│   │   └── themeSlice.js       # Dark/light theme state
│   ├── App.jsx                 # Root component, routing, theme effect
│   ├── main.jsx                # React DOM entry point, Redux Provider
│   ├── App.css                 # Global component styles (glassmorphism etc.)
│   └── index.css               # Tailwind base + custom design tokens
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

##  Technology Stack

 Technology and Version used along with thier Purpose 

- **React** version - 19 used for UI component library — core framework 
- **Vite** version - 8 used for Lightning-fast dev server and build tool 
- **React Router DOM** version 7 used for Client-side routing and navigation 
- **Redux Toolkit** version 2 used for Global state management (bookmarks, theme) 
- **React-Redux** version - 9 used for React bindings for Redux store 
- **Recharts**  version - 3 used for Declarative chart components (Pie, Bar) 
- **Lucide React**  Latest version used for SVG icon library
- **Tailwind CSS** version - 3 used for Utility-first CSS styling framework 
- **Tailwind Merge** version - 3 used to Safely merge conflicting Tailwind class names 
- **PostCSS + Autoprefixer** used for CSS post-processing for cross-browser support 
- **ESLint**  version - 10 used for Code quality and linting 

---
##  How It Works

### Data Flow
1. **Threat Data** is managed via a custom hook (`useFetchThreats`) that provides a static/mock dataset of cyber threats with fields: `id`, `title`, `category`, `severity`, `description`, `affectedSystems`, `mitigation`.
2. **Global State** is handled by Redux Toolkit with two slices:
   - `bookmarksSlice` — manages the list of bookmarked threat IDs; provides `addBookmark` and `removeBookmark` actions.
   - `themeSlice` — tracks `light` or `dark` mode; the root `App.jsx` subscribes to this and toggles the `dark` class on `<html>`.
3. **Routing** uses React Router v7 with lazy-loaded pages via `React.lazy()` and `<Suspense>` for better performance.

### Scam Analyzer Engine
```
Input Text → Lowercase → Keyword Scan (15 patterns × weight)
    → Score Accumulation → Cap at 100
    → Verdict: Safe (< 40) / Caution (40–69) / Suspicious (≥ 70)
    → Highlight matched keywords in original text
```

### Dark Mode Implementation
- Redux stores the theme mode (`light` | `dark`)
- `App.jsx` runs a `useEffect` that adds/removes the `dark` class on `document.documentElement`
- Tailwind's `darkMode: 'class'` strategy applies `dark:` variants accordingly

---

##  Getting Started

### Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/agrimamishra288-tech/webd2_Capstone.git
cd webd2_Capstone

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **`http://localhost:5173`** (or the next available port).

### Other Scripts

```bash
npm run build     # Build for production (outputs to /dist)
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint to check code quality
```

---

##  Key Concepts Demonstrated

This project demonstrates the following Web Development 2 concepts:

- ✅ **Component-Based Architecture** — Reusable, single-responsibility React components
- ✅ **State Management** — Global state with Redux Toolkit (slices, actions, selectors)
- ✅ **React Hooks** — `useState`, `useEffect`, `useMemo`, `useSelector`, `useDispatch`, custom hooks
- ✅ **Client-Side Routing** — Multi-page SPA with React Router v7, dynamic route params (`/threat/:id`)
- ✅ **Code Splitting** — Lazy loading with `React.lazy()` and `<Suspense>` for performance
- ✅ **Data Visualization** — Interactive charts with Recharts (PieChart, BarChart, ResponsiveContainer)
- ✅ **Conditional Rendering** — UI adapts based on state (loading, error, results, quiz answers)
- ✅ **Forms & Events** — Controlled inputs, form submission handling, real-time state updates
- ✅ **Dark Mode** — Theme toggling with CSS classes and Redux persistence
- ✅ **Responsive Design** — Mobile-first layouts using Tailwind CSS grid and flexbox
- ✅ **Modern CSS** — Glassmorphism effects, animated gradients, smooth transitions

---

##  Pages Overview



- Home - `/` - Hero, quick knowledge base, navigation links 
- Threat Explorer - `/explorer`-  Browse, search, and filter all threats 
- Threat Detail - `/threat/:id` - Full details for a single threat 
- Dashboard - `/dashboard` - Analytics charts and quick stats 
- Scam Analyzer - `/analyzer` - Paste & analyze suspicious messages 
- Quiz - `/quiz` - 5-question cybersecurity quiz 
- Knowledge Base - `/knowledge` - Educational cards on threat types 
- Bookmarks - `/bookmarks` - View and manage saved threats 

