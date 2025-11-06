
## Principals
- Completeness first: Ensure we have a working product. 
- Velocity whenever possible: Prioritized libraries I have used or fix requirements very well
- Type Safety: Written in Typescript

## Assumptions
- Users always own robots. ALthough they can share usage to a group, they can never lose ownership
  - Considered a case where if group owns a robot and everyone leaves
- Admin can not remove other Admin
  -  In a more real 

## Tradeoffs
- Used session based authentication for speed. 
  - Easy to implement. JWT could have been used to make backend stateless but more setup required
- CSR (client side render) app
  - Considering a dashboard scenario, we didn't necessarily need any SSR (Server side render) project


## Out of scope
- Transferring ownership of a robot
- More complex group management
- UX improvements
  - Pagination, filters, search for robots or groups
- Performance
  - Caching robot details
  - Caching group details




# Archectiure

## Frontend
This is a React Typescript project. Uses the following libraries
- Better Auth
- Tailwind
- React
- Shadcn
- Zod


## Backend
This is an Express JS server with
- Drizzle ORM with Postgres driver
- Better Auth


### Entities
- User
- Organizations
- Members
- Robots
- RobotSetting