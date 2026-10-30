# BytEthic API (Next.js + MongoDB)

## Endpoints
| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | /api/enquiries | public | Save a project enquiry (validated, rate-limited) |
| GET | /api/enquiries?status=new | admin | List enquiries |
| PATCH | /api/enquiries/:id | admin | Body `{ "status": "contacted" }` |
| GET | /api/content/services, /api/content/projects | public | App content |
| GET | /api/health | public | DB check |

Admin routes need header `x-admin-key: <ADMIN_API_KEY>` (16+ characters).

## Setup
1. Create a free MongoDB Atlas cluster. Database Access: add a user. Network Access: allow 0.0.0.0/0 (needed for Vercel).
2. `cp .env.example .env.local` and fill in the values.
3. `npm install && npm run dev` then open http://localhost:3000/api/health

## Deploy (Vercel)
Push to GitHub, import the repo at vercel.com, add the same env vars, deploy.
Your API base URL is then `https://your-project.vercel.app`.

## Test
    curl -X POST $URL/api/enquiries -H "Content-Type: application/json" \
      -d '{"name":"Test User","email":"t@example.com","message":"Testing the API works"}'
    curl $URL/api/enquiries -H "x-admin-key: $ADMIN_API_KEY"
