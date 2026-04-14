# Admin Panel Implementation - Approved Plan

**Current Progress:**
- [x] Gather project info, read key files, create plan
- [x] User approved plan

**Breakdown of approved plan:**

1. ~~Backend (server/): Node/Express/TS API~~
2. ~~Local Mongo: ./data dir~~
3. ~~Client updates: AuthContext, Admin pages/components~~
4. ~~Integrate forms to API~~
5. ~~package.json deps/scripts~~
6. ~~vite.config proxy~~
7. **Start MongoDB** `mkdir data && mongod --dbpath ./data`
8. Test full system

**Backend complete** (models, routes, auth, deps installed)
- [x] Backend API + Mongo models
- [ ] Start MongoDB `mongod --dbpath ./data`
- [ ] cd server && npm run dev

**Progress:**
- [x] Backend API complete
- [x] Client AuthContext + Admin login/dashboard routes protected
- [ ] Update forms (Contact, ProjectRequest, Careers) to POST /api/*
- [ ] Full admin pages with tables (Messages, Projects, etc.)
- [ ] Navbar admin link

**To test:**
1. Terminal1: `mongod --dbpath ./data`
2. Terminal2: `cd server && npm run dev`
3. Terminal3: `npm run dev` (client)
4. localhost:5173/admin/login pw: "build something useful"
