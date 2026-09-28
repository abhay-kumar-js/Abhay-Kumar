# Abhay Kumar — Full-Stack Portfolio & CMS

A production-ready personal portfolio and administrative content management system (CMS) engineered for **Abhay Kumar**, a professional Web Developer with **4+ years of experience**.

---

## 🚀 Key Features

* **Client Experience (React.js + Vite + Vanilla JavaScript)**:
  * Dedicated pages for each menu destination (`/`, `/about`, `/services`, `/projects`, `/projects/:slug`, `/skills`, `/experience`, `/contact`).
  * Real-time dynamic data fetching via REST API.
  * Active navigation route highlighting and responsive mobile drawer menu.
  * Accessible contact form with validation and duplicate submission prevention.
  * High-performance visual styling using Tailwind CSS, Syne, Plus Jakarta Sans, and JetBrains Mono typography.

* **Backend & API Architecture (Node.js + Express.js + Netlify Functions)**:
  * Modular architecture (`config/`, `controllers/`, `middleware/`, `models/`, `routes/`, `utils/`).
  * MongoDB Atlas schema definitions with Mongoose (`User`, `Project`, `Service`, `ContactMessage`, `SiteSettings`).
  * Dual-mode data persistence: Seamlessly uses MongoDB Atlas when `MONGODB_URI` is provided, with an auto-seeded fallback store for local development.
  * Secure JWT authentication with HttpOnly cookies & Bearer tokens.
  * Password hashing using `bcryptjs`.
  * Security hardening with `helmet`, `cors`, and `express-rate-limit`.

* **Admin CMS Dashboard (`/admin`)**:
  * Real-time KPI overview: Total Projects, Featured Projects, Total Services, New Messages, Read Messages.
  * Full CRUD for Projects (ordering, category, tags, live URLs, featured flag).
  * Full CRUD for Services (feature lists, ordering, active/disabled toggle).
  * Inquiry Inbox: Filter, mark as read, mark as replied, archive, delete, or direct email reply.
  * Global Site Settings & SEO metadata management.

---

## 📁 Project Structure

```text
abhay-portfolio/
│
├── client/ (or src/)
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Button.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── Loader.jsx
│   │   └── ProtectedRoute.jsx
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectDetails.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   └── admin/
│   │       ├── Login.jsx
│   │       ├── Dashboard.jsx
│   │       ├── Projects.jsx
│   │       ├── Services.jsx
│   │       ├── Messages.jsx
│   │       └── Settings.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── serviceController.js
│   │   ├── contactController.js
│   │   └── settingsController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Service.js
│   │   ├── ContactMessage.js
│   │   └── SiteSettings.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── contactRoutes.js
│   │   └── settingsRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── dataStore.js
│   ├── server.js
│   └── package.json
│
├── netlify/
│   └── functions/
│       └── api.mjs
│
├── .env.example
├── netlify.toml
├── package.json
├── server.ts
└── README.md
```

---

## 🛠️ Step-by-Step Deployment Guide to Netlify

### Step 1 — Create MongoDB Atlas Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign in.
2. Create a new cluster (Free Shared Cluster M0).
3. Under **Database Access**, create a database user (e.g. `abhay_admin`) with a secure password.
4. Under **Network Access**, add IP address `0.0.0.0/0` (Allow access from anywhere) so Netlify serverless functions can connect.
5. In your cluster dashboard, click **Connect** → **Drivers** (Node.js).
6. Copy your connection string:
   ```text
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/abhay_portfolio?retryWrites=true&w=majority
   ```

### Step 2 — Configure Environment Variables in Netlify
1. Log in to your [Netlify Dashboard](https://app.netlify.com).
2. Go to your site: **Site configuration** → **Environment variables**.
3. Add the following variables:

| Variable Name | Example Value | Description |
|---|---|---|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster0...` | MongoDB Atlas URI |
| `JWT_SECRET` | `a_very_long_secure_random_string` | Secret for token signing |
| `NODE_ENV` | `production` | Production mode |
| `CLIENT_URL` | `https://your-custom-portfolio.netlify.app` | Production frontend domain |
| `ADMIN_NAME` | `Abhay Kumar` | Administrator display name |
| `ADMIN_EMAIL` | `admin@abhaykumar.dev` | Admin login email |
| `ADMIN_PASSWORD` | `YourSecurePasswordHere` | Admin login password |

### Step 3 — Deploy to Netlify (Via Git or CLI)

#### Method A: Via GitHub (Recommended)
1. Initialize Git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of full-stack portfolio & CMS"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/abhay-portfolio.git
   git push -u origin main
   ```
2. In Netlify, click **Add new site** → **Import an existing project** → **GitHub**.
3. Select your repository.
4. Netlify will automatically detect `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
5. Click **Deploy Site**.

#### Method B: Via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## 💻 Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Fill in your values (or leave `MONGODB_URI` blank to use the built-in auto-seeding local store during testing).

3. **Run the Full-Stack Dev Server**:
   ```bash
   npm run dev
   ```
   The application runs on `http://localhost:3000` with both the Express REST API (`/api/*`) and Vite HMR frontend.

4. **Access the Admin CMS**:
   - URL: `http://localhost:3000/admin/login`
   - Default Email: `admin@abhaykumar.dev`
   - Default Password: `Admin@12345`

---

## 🔒 Security Best Practices Implemented

* Passwords hashed using `bcryptjs` with salt rounds.
* JWT authentication with HttpOnly cookies & Bearer tokens.
* Helmet headers enabled for protection against common web vulnerabilities.
* Rate limiting on contact form submissions (`express-rate-limit`) to prevent abuse.
* Input validation on all public and protected mutation endpoints.
* Zero secrets in frontend client code.
