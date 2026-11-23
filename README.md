# Movieflix (Netflix clone for learning)

React (client) + Node/Express (server) + MongoDB.

## One-time setup
1. Install MongoDB Community Server (https://www.mongodb.com/try/download/community).
   Choose "Run as a Service" in the installer so it starts automatically.
2. In `server/`: `npm install`
3. In `client/`: `npm install`
4. Copy `server/.env.example` to `server/.env` and update the values if needed.
5. Fill the database with sample movies: in `server/` run `npm run seed`

## Run it (two terminals)
- Terminal 1: `cd server` then `npm run dev`   -> http://localhost:5000
- Terminal 2: `cd client` then `npm run dev`   -> http://localhost:5173

Open http://localhost:5173, create an account, and browse.

## Folder map
- `server/models`      what a User and a Movie look like in MongoDB
- `server/routes`      the API: auth, movies, my list
- `server/middleware`  checks the login token
- `client/src/pages`   Login, Register, Home, MovieDetail, MyList
- `client/src/api.js`  all calls from React to the server

## Deploy on Render + MongoDB Atlas

This repository includes a `render.yaml` Blueprint that creates a Node web
service and a Vite static site while keeping the same learning-friendly stack.

### 1. Create the Atlas database

1. Sign in to MongoDB Atlas and create a project plus a free `M0` cluster.
2. Open **Database Access**, create a database user, and keep its password out
   of Git. Use a URL-encoded password if it contains characters such as `@` or
   `/`.
3. Open **Network Access** and allow Render to reach the cluster. The simplest
   student-project setup is `0.0.0.0/0`; use narrower Render outbound ranges
   when available and always keep database authentication enabled.
4. Click **Connect > Drivers > Node.js** and copy the connection string. Replace
   `<password>` and add a database name, for example:

   `mongodb+srv://movieflix_user:<password>@cluster0.example.mongodb.net/movieflix?retryWrites=true&w=majority`

### 2. Push the repository to GitHub

Create a GitHub repository, then push this project. The root `.gitignore`
already prevents `.env`, logs, dependencies, and build output from being
uploaded. Never add the Atlas URI or JWT secret to a committed file.

### 3. Create both Render services

1. In Render, choose **New > Blueprint** and connect the GitHub repository.
2. Render reads `render.yaml` and proposes `movieflix-api` plus
   `movieflix-client`.
3. Enter `MONGO_URI` for the API using the Atlas connection string. Render
   generates `JWT_SECRET` automatically.
4. Create the Blueprint. The first deploy may wait for the cross-service URLs;
   this is normal.

### 4. Connect the frontend and backend URLs

After Render assigns the real `onrender.com` addresses, set:

- API service `CLIENT_URL` = the client URL, for example
  `https://movieflix-client.onrender.com`
- Static site `VITE_API_URL` = the API URL plus `/api`, for example
  `https://movieflix-api.onrender.com/api`

Save the variables and redeploy both services. `VITE_API_URL` is a build-time
Vite variable, so the client must be rebuilt after it changes.

### 5. Seed Atlas once

On your computer, temporarily put the Atlas URI in `server/.env` as
`MONGO_URI`, run `npm run seed` inside `server`, then restore your local URI if
you still use local MongoDB. The seed replaces the catalog and clears old My
List/Continue Watching references, so run it only when that reset is intended.
Do not commit `server/.env`.

### 6. Check the deployment

- Open `https://<your-api-name>.onrender.com/api/health` and confirm it returns
  `{"status":"ok"}`.
- Open the client, register a test account, switch between All, Movies, and
  Shows, open one detail page, and refresh that page.
- If the browser reports CORS errors, recheck `CLIENT_URL` for an exact match
  with the client origin and no trailing slash.

Render uses `/api/health` to check the API. Client-side routes are rewritten to
`index.html`, so refreshing a movie detail page continues to work.

## Ideas for next steps
Profiles per account, genre filter buttons, "continue watching", admin page to add movies.
