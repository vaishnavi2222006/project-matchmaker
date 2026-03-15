# 🚀 Project-Matchmaker

An AI-powered platform that matches developers with open-source projects based on their skills, interests, and GitHub profile analysis. Find your perfect open-source contribution opportunity!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.x-61dafb.svg)

## ✨ Features

### 🎯 Smart Matching
- **AI-Powered Recommendations**: Get personalized repository suggestions based on your GitHub profile
- **Skill Analysis**: Automatic detection of your tech stack from repositories and contributions
- **Match Scoring**: See how well projects align with your expertise

### 📊 Comprehensive Analytics
- **Contribution Tracking**: View your GitHub contributions with accurate GraphQL-powered data
- **Tech Stack Management**: Manage both GitHub-detected and custom technologies
- **Activity Insights**: Track your open-source journey with detailed statistics

### 🔍 Advanced Search
- **Multi-Filter Search**: Find projects by language, stars, topics, and more
- **Bookmark Repositories**: Save interesting projects for later
- **Contribution History**: Visualize your contribution patterns with heatmaps

### 🎨 Modern UI/UX
- **Dark/Light Themes**: Beautiful, eye-friendly themes
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Professional Interface**: Clean, modern design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Query** - Powerful data fetching & caching
- **Recharts** - Beautiful data visualizations
- **React Router** - Client-side routing

### Backend
- **Node.js & Express** - REST API server
- **Supabase** - PostgreSQL database & authentication
- **GitHub OAuth** - Secure authentication
- **GitHub GraphQL API** - Accurate contribution data
- **Axios** - HTTP client
- **JWT** - Token-based authentication

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **Supabase** account
- **GitHub OAuth App** credentials

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Kedar-1118/openSourceMatchmaker.git
cd openSourceMatchmaker
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:
```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Apply database migrations:
```bash
# Run SQL files in Backend/supabase/migrations/ in your Supabase SQL editor
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000
VITE_GITHUB_CLIENT_ID=your_github_client_id
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
openSourceMatchmaker/
├── Backend/                 # Backend server
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   │   ├── database.js  # Supabase client
│   │   │   └── github.js    # GitHub API config
│   │   ├── controllers/     # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── profileController.js
│   │   │   ├── recommendationsController.js
│   │   │   ├── savedController.js
│   │   │   └── searchController.js
│   │   ├── middleware/      # Express middleware
│   │   │   ├── auth.js      # JWT authentication
│   │   │   └── errorHandler.js
│   │   ├── routes/          # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── profileRoutes.js
│   │   │   ├── recommendationsRoutes.js
│   │   │   ├── savedRoutes.js
│   │   │   └── searchRoutes.js
│   │   ├── services/        # Business logic
│   │   │   ├── githubService.js
│   │   │   ├── analysisService.js
│   │   │   └── matchService.js
│   │   ├── app.js           # Express app setup
│   │   └── server.js        # Server entry point
│   ├── supabase/
│   │   └── migrations/      # Database migrations
│   ├── logs/                # Log files
│   ├── .env                 # Backend environment variables
│   ├── .env.example         # Backend env template
│   └── package.json         # Backend dependencies
│
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── RepoCard.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── useApi.js
│   │   ├── pages/           # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Recommendations.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Saved.jsx
│   │   │   └── History.jsx
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── store/           # Zustand stores
│   │   │   ├── authStore.js
│   │   │   └── themeStore.js
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── .env                 # Frontend environment variables
│   ├── .env.example         # Frontend env template
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind configuration
│   └── package.json         # Frontend dependencies
│
├── DEPLOYMENT.md            # Deployment instructions
└── README.md                # This file
```

> **📚 Detailed Documentation**
> - [Backend Documentation](./Backend/README.md) - API, database, and server details
> - [Frontend Documentation](./frontend/README.md) - Components, hooks, and styling

## 🔑 GitHub OAuth Setup

1. Go to [GitHub Settings → Developer Settings → OAuth Apps](https://github.com/settings/developers)
2. Click \"New OAuth App\"
3. Fill in:
   - **Application name**: Open Source Matchmaker (Dev)
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5000/auth/github/callback`
4. Copy Client ID and Client Secret to your `.env` files in both `Backend` and `frontend` directories

## 🗄️ Database Setup

The application uses Supabase (PostgreSQL). Run these migrations in order in your Supabase SQL editor:

1. `Backend/supabase/migrations/20251202173826_create_users_and_repos_tables.sql` - Base tables
2. `Backend/supabase/migrations/20251205_add_user_techstack.sql` - Tech stack column

## 📡 API Endpoints

### Authentication
- `POST /auth/github` - Initiate GitHub OAuth
- `GET /auth/github/callback` - OAuth callback
- `POST /auth/logout` - Logout user

### Profile
- `GET /profile/summary` - User profile summary
- `GET /profile/repos` - User repositories
- `GET /profile/stats` - User statistics
- `GET /profile/contributions` - Contribution calendar (GraphQL)
- `GET /profile/techstack` - User tech stack
- `PUT /profile/techstack` - Update tech stack

### Recommendations
- `GET /recommendations` - Get recommended repositories

### Search
- `GET /search` - Search repositories

### Saved
- `GET /saved/list` - List saved repositories
- `POST /saved/add` - Save a repository
- `POST /saved/remove` - Remove saved repository

## 🎨 Features Overview

### Landing Page
- Attractive hero section with platform overview
- Feature highlights
- How it works section
- Call-to-action buttons

### Dashboard
- Activity overview
- Tech stack visualization
- Contribution graphs (powered by GraphQL)
- Recent repositories

### Profile Page
- GitHub profile information
- Repository management with search/filter/sort
- Tech stack management (GitHub-detected + custom)
- Contribution insights

### Recommendations
- AI-powered repository suggestions
- Match score indicators
- One-click save functionality

### Search
- Advanced filtering options
- Language, stars, topics filters
- Real-time search results

### Saved Repositories
- Manage bookmarked projects
- Quick removal
- Contribution opportunities

### History
- Contribution heatmap
- Activity statistics
- Streak tracking

## 🔧 Environment Variables

### Backend (`Backend/.env`)
```env
PORT=5000
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=
JWT_SECRET=
CLIENT_URL=
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=
VITE_GITHUB_CLIENT_ID=
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Backend**: Render, Railway, Heroku

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Vaishnavi**

## 🙏 Acknowledgments

- GitHub API for providing comprehensive developer data
- Supabase for the excellent backend infrastructure
- The open-source community for inspiration

## 📧 Support

For support, email or open an issue on GitHub.

---

Made with ❤️ for the open-source community

