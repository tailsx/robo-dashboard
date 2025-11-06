
Note to the team: I have it working locally, but I have issues deploying it remotely.
- https://fantastic-gumdrop-d3aaaa.netlify.app for frontend
- https://dexmate.duckdns.org for backend
It is mostly complete and I hope I get the chance to do a more complete demo when given the opportunity


## Principals
- Completeness first: Ensure we have a working product. 
- Velocity whenever possible: Prioritized libraries I have used or fix requirements very well
- Type Safety: Written in Typescript

## Assumptions
- Users always own robots. ALthough they can share usage to a group, they can never lose ownership
  - Considered a case where if group owns a robot and everyone leaves
- Admin can not remove other Admin
  - Simplies cases where 

## Tradeoffs
- Used session based authentication for dev speed. 
  - Easy to implement. JWT could have been used to make backend stateless but more setup required
- CSR (client side render) app
  - Considering a dashboard scenario, we didn't necessarily need any SSR (Server side render) project
- Attempted to minimize joins by denormalizing Robots table for group name


## Out of scope
- Transferring ownership of a robot
- More complex group management
- UX improvements
  - Pagination, filters, search for robots or groups
- Performance
  - Managing cache for robot and group detail page




# Archectiure

## Frontend
This is a React Typescript project. Uses the following libraries
- Better Auth
- Tailwind
- React
- Shadcn
- Zod

### Setup
Put the following file in /dexmate-frontend/.env
```
VITE_BASE_URL=http://localhost:3000
```
then run these commands to start a frontend dev server
```
cd /dexmate-frontend
npm i
npm run dev
```



## Backend
This is an Express JS server with
- Drizzle ORM with Postgres driver
- Better Auth

### Setup
have a /dexmate-backend/.env
```
PORT=3000
DATABASE_URL=postgresql://<DB_USER>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/<DB_DATABASE>

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
```
where `BETTER_AUTH_SECRET` is a random hash that is generated. Learn more [here](https://www.better-auth.com/docs/installation#set-environment-variables)



then start Express server with follow
```
cd /dexmate-backend
npm i
npm run dev
```


