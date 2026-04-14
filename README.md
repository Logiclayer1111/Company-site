# Company Site

Full-stack company website with admin panel.

## Tech Stack
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + MongoDB (local)
- **Features**: Projects showcase, contact form, careers applications, admin dashboard for messages/projects/applications

## Local Setup
1. MongoDB: `mongod --dbpath ./server/data`
2. Backend: `cd server && npm install && npm run dev`
3. Frontend: `npm install && npm run dev` (or `cd client && npm run dev`)
4. Admin: http://localhost:5173/admin/login (pw: build something useful)

## API
- Auth: POST /api/auth/login, /api/auth/register
- Projects: GET/POST /api/projects
- Messages/Applications: POST /api/contact, /api/apply

