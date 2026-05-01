# 🚀 Deployment Guide — Open Source Matchmaker

**Stack**: Node.js/Express backend → **Render** | React/Vite frontend → **Vercel**

---

## ⚠️ Security First — API Key Safety

> **Never commit `.env` files to Git.** Both `Backend/.env` and `frontend/.env` are already in their respective `.gitignore` files — correct and safe.

### Golden Rules
- All secrets go into the **hosting platform's dashboard** (Render / Vercel), never in code or git.
- The only value the frontend can expose is `VITE_GITHUB_CLIENT_ID` (public OAuth Client ID — not a secret).
- `GITHUB_CLIENT_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, `GEMINI_API_KEY` must **only** live on Render — never in the frontend.

---

## 📋 Pre-Deployment Checklist

- [ ] All code pushed to GitHub (`Backend/` and `frontend/` changes committed)
- [ ] [Render account](https://render.com) created (free tier is fine)
- [ ] [Vercel account](https://vercel.com) created (free tier is fine)
- [ ] Supabase project is live and database tables exist

---

## Step 1 — Deploy Backend to Render

### 1.1 Push latest code to GitHub

```bash
cd /path/to/Projects-Matchmaker
git add .gitignore Backend/render.yaml frontend/vercel.json frontend/vite.config.js
git commit -m "chore: deployment configs with performance optimizations"
git push origin main
```

### 1.2 Create Web Service on Render

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New** → **Web Service**
2. Connect GitHub → select this repository
3. Fill in these settings:

| Setting | Value |
|---|---|
| **Name** | `oss-matchmaker-backend` |
| **Region** | Oregon (or closest to you) |
| **Root Directory** | `Backend` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

4. Click **Create Web Service** — Render auto-detects `Backend/render.yaml`.

### 1.3 Set Environment Variables on Render

Navigate to your service → **Environment** tab → add each variable:

```
NODE_ENV                  = production
PORT                      = 10000
GITHUB_CLIENT_ID          = Ov23licOJ4yuyKZGT9Rz
GITHUB_CLIENT_SECRET      = <from your GitHub OAuth App>
GITHUB_CALLBACK_URL       = https://<your-render-name>.onrender.com/auth/github/callback
JWT_SECRET                = <your jwt secret — min 32 chars>
JWT_EXPIRE                = 7d
SUPABASE_URL              = https://ljypjkbyqzdzaicewkkp.supabase.co
SUPABASE_ANON_KEY         = <your supabase anon key>
SUPABASE_SERVICE_ROLE_KEY = <your supabase service role key>
GEMINI_API_KEY            = <your gemini api key>
FRONTEND_URL              = https://<your-vercel-app>.vercel.app
CLIENT_URL                = https://<your-vercel-app>.vercel.app
```

> Fill in `FRONTEND_URL` and `CLIENT_URL` after you complete Step 2. Use placeholder for now and update after.

### 1.4 Verify the backend is live

Visit `https://<your-render-name>.onrender.com` — you should see:
```json
{ "message": "Open Source Matchmaker API", "version": "1.0.0" }
```

---

## Step 2 — Deploy Frontend to Vercel

### 2.1 Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:

| Setting | Value |
|---|---|
| **Framework Preset** | Vite |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### 2.2 Set Environment Variables on Vercel

Go to **Settings** → **Environment Variables**:

```
VITE_API_URL              = https://<your-render-name>.onrender.com
VITE_APP_NAME             = Open Source Matchmaker
VITE_ENABLE_API_DISCOVERY = true
VITE_GITHUB_CLIENT_ID     = Ov23licOJ4yuyKZGT9Rz
```

> ⚠️ **Do NOT add** `GITHUB_CLIENT_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, or `GEMINI_API_KEY` to Vercel. These are backend-only secrets.

4. Click **Deploy**

---

## Step 3 — Update GitHub OAuth App

1. Go to [github.com/settings/developers](https://github.com/settings/developers) → **OAuth Apps** → your app
2. Update:

| Field | Value |
|---|---|
| **Homepage URL** | `https://<your-vercel-app>.vercel.app` |
| **Authorization callback URL** | `https://<your-render-name>.onrender.com/auth/github/callback` |

3. Click **Save changes**

---

## Step 4 — Cross-Link Both Services

Go back to **Render** and update the placeholder values:
```
FRONTEND_URL = https://<your-vercel-app>.vercel.app
CLIENT_URL   = https://<your-vercel-app>.vercel.app
```

Then **redeploy both**:
- Render → **Manual Deploy** button
- Vercel → automatic (or Deployments → ··· → Redeploy)

---

## ⚡ Performance Optimizations (Already Applied)

### Frontend — `vite.config.js`
| Optimization | Effect |
|---|---|
| Manual chunk splitting (`vendor`, `ui`, `data`, `charts`) | Each chunk cached independently by browser |
| ESBuild minification | Fastest minifier — smaller JS/CSS output |
| `sourcemap: false` | Smaller production bundles |
| Hashed filenames (Vite default) | Enables 1-year immutable cache on Vercel |

### Frontend — `vercel.json`
| Config | Effect |
|---|---|
| `Cache-Control: immutable` on `/assets/*` | Browser never re-downloads unchanged JS/CSS |
| SPA rewrites `/* → /index.html` | No 404 on page refresh or direct URL |
| Security headers on all routes | `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` |

### Backend — `src/app.js`
| Middleware | Effect |
|---|---|
| `compression` | Gzip all responses — ~70% smaller payloads |
| `helmet` | Security headers (CSP, HSTS, etc.) |
| `express-rate-limit` | 100 req/15min per IP — DDoS protection |
| `0.0.0.0` bind | Required for Render to route external traffic |

---

## 🔄 Future Deploys

Every `git push origin main` triggers an automatic redeploy on **both** Render and Vercel. No manual steps needed for code updates after the first setup.

---

## 🐛 Troubleshooting

### Slow first response on Render (Free Tier)
Render free services spin down after 15 min idle and take ~30s to wake up.

**Free fix — UptimeRobot**:
1. Sign up at [uptimerobot.com](https://uptimerobot.com) (free)
2. Add Monitor → HTTP(S) → URL: `https://<your-render-name>.onrender.com`
3. Interval: **5 minutes** → Save
4. This keeps the service warm at no cost

**Paid fix**: Upgrade to Render Starter ($7/mo) — always-on, no spin-down.

### CORS error in browser console
- Check `FRONTEND_URL` on Render matches your Vercel URL **exactly**
- ✅ `https://my-app.vercel.app` — no trailing slash
- ❌ `https://my-app.vercel.app/` — trailing slash breaks CORS matching

### 404 on `/auth/github/callback`
1. GitHub OAuth app → callback URL = `https://<render-url>/auth/github/callback` ✅
2. `VITE_API_URL` on Vercel → points to Render URL (not localhost) ✅
3. Redeploy frontend after changing env vars ✅

### Env var not taking effect on Vercel
Vercel requires a full redeploy after env changes:
Deployments tab → click **···** on latest → **Redeploy**

### Build fails on Vercel
```bash
# Test production build locally first
cd frontend && npm run build
# If it passes locally, check Node version in Vercel Settings → General → Node.js version → 20.x
```

### View backend logs
Render Dashboard → your service → **Logs** tab (real-time)

---

## 🔐 Security Reference

| Secret | Render | Vercel | Exposed to browser? |
|---|---|---|---|
| `GITHUB_CLIENT_ID` | ✅ | ✅ (as `VITE_`) | ✅ Safe — public OAuth ID |
| `GITHUB_CLIENT_SECRET` | ✅ | ❌ Never | ❌ Never |
| `JWT_SECRET` | ✅ | ❌ Never | ❌ Never |
| `SUPABASE_ANON_KEY` | ✅ | ❌ Never | ❌ Never |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | ❌ Never | ❌ Never |
| `GEMINI_API_KEY` | ✅ | ❌ Never | ❌ Never |

---

## ✅ Post-Deployment Checklist

- [ ] `https://<render-url>/` → returns JSON health check
- [ ] `https://<vercel-url>/` → frontend loads correctly
- [ ] GitHub OAuth login completes end-to-end
- [ ] Browser DevTools → Network → zero requests going to `localhost`
- [ ] `FRONTEND_URL` on Render = Vercel URL (no trailing slash)
- [ ] `VITE_API_URL` on Vercel = Render URL (no trailing slash)
- [ ] GitHub OAuth callback URL updated in GitHub Settings
- [ ] UptimeRobot monitor live → no more cold starts

---

## 📚 Quick Reference

| Resource | URL |
|---|---|
| Render Dashboard | https://dashboard.render.com |
| Vercel Dashboard | https://vercel.com/dashboard |
| GitHub OAuth Apps | https://github.com/settings/developers |
| Supabase Dashboard | https://supabase.com/dashboard |
| UptimeRobot (free keep-alive) | https://uptimerobot.com |

---

**🎉 Your app is deployed — fast responses, zero exposed secrets.**
