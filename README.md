# GDG CSMU Backend API

Node.js + Express + MongoDB Atlas — 100% Free Cloud Storage

---

## 🆓 Free Cloud Setup (MongoDB Atlas — 512MB Free Forever)

### Step 1 — Create MongoDB Atlas Account
1. Go to **https://cloud.mongodb.com**
2. Sign up for free
3. Create a new project → **"GDG CSMU"**

### Step 2 — Create Free Cluster
1. Click **"Build a Database"**
2. Choose **M0 FREE** (512MB — enough for thousands of users)
3. Select **AWS → Mumbai (ap-south-1)** for best speed in India
4. Cluster name: `gdg-csmu-cluster` → Click **Create**

### Step 3 — Database User
1. Go to **Database Access** → **Add New Database User**
2. Username: `gdgadmin`
3. Password: (generate a strong one, save it!)
4. Role: **Atlas Admin** → **Add User**

### Step 4 — Network Access
1. Go to **Network Access** → **Add IP Address**
2. Click **"Allow Access from Anywhere"** → `0.0.0.0/0`
3. Click **Confirm**

### Step 5 — Get Connection String
1. Go to **Database** → **Connect**
2. Choose **"Drivers"** → Node.js
3. Copy the connection string — looks like:
   ```
   mongodb+srv://gdgadmin:<password>@gdg-csmu-cluster.xxxxx.mongodb.net/
   ```
4. Replace `<password>` with your actual password

---

## ⚙️ Local Setup

```bash
# 1. Clone / open this folder
cd gdg-backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Edit .env — paste your MongoDB URI
MONGODB_URI=mongodb+srv://gdgadmin:yourpassword@gdg-csmu-cluster.xxxxx.mongodb.net/gdg_csmu

# 5. Start the server
npm run dev       # development (auto-restart)
npm start         # production
```

Server starts at: **http://localhost:5000**

---

## 🚀 Deploy Free on Render.com

1. Push this folder to **GitHub**
2. Go to **https://render.com** → New → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Add **Environment Variables:**
   - `MONGODB_URI` = your Atlas URI
   - `JWT_SECRET` = any random string
   - `NODE_ENV` = production
6. Click **Deploy** — get a free `https://your-app.onrender.com` URL

---

## 📡 API Endpoints

### Auth
| Method | URL | Body | Description |
|--------|-----|------|-------------|
| POST | `/api/auth/signup` | `{name, email, password}` | Register new user |
| POST | `/api/auth/login` | `{email, password}` | Login, get JWT token |
| GET | `/api/auth/me` | Header: `Bearer token` | Get current user |

### Event Registration
| Method | URL | Body/Params | Description |
|--------|-----|-------------|-------------|
| POST | `/api/register` | `{name, email, eventId, eventName, rollNo?, course?}` | Register for event |
| GET | `/api/register/check` | `?email=x&eventId=y` | Check if already registered |
| GET | `/api/register/all` | Admin token required | All registrations |

### Certificates
| Method | URL | Body/Params | Description |
|--------|-----|-------------|-------------|
| POST | `/api/certificates/generate` | `{name, email, eventName, rollNo?, course?}` | Generate certificate |
| GET | `/api/certificates/verify/:certId` | — | Verify certificate |
| GET | `/api/certificates/my` | `?email=x` | All certs for email |

---

## 🗄️ Database Collections (MongoDB)

| Collection | What it stores |
|-----------|----------------|
| `users` | Member accounts (hashed passwords) |
| `registrations` | Event registrations |
| `certificates` | Issued certificates |

---

## 🔗 Connect Frontend

In `gdg-website.html`, the API base URL is already set to:
```js
const API = 'http://localhost:5000'; // change to Render URL after deploy
```

All forms (Sign Up, Login, Register for Event, Get Certificate) automatically call this backend.
