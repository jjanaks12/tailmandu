# Monolith to Microservices Migration Strategy

This document outlines the architectural strategy and step-by-step plan for migrating the Trailmandu Express monolith to a Microservice architecture. We will use the **Strangler Fig Pattern**, which allows us to leave the monolith running exactly as it is, while gradually "strangling" it by extracting one module at a time.

## 1. The Core Strategy (API Gateway)

To transition transparently, the frontend must not know whether it's talking to the monolith or a new microservice. We will introduce an **API Gateway** (e.g., NGINX, Traefik, or an Express proxy like `http-proxy-middleware`).

**Current Flow:**
`Frontend (Vue)` -> `Monolith (Express)`

**New Flow:**
`Frontend (Vue)` -> `API Gateway`
- Gateway routing rules:
  - If request is `/api/blogs/*` -> Route to `New Blog Microservice`
  - If request is `/api/events/*` -> Route to `New Event Microservice`
  - If request is `/*` (anything else) -> Route to `Existing Monolith` (Fallback)

This allows the monolith to remain completely intact. As we migrate a module, we simply update the Gateway's routing rules to point to the new service.

## 2. Defining the Bounded Contexts (Microservices)

Based on the current `controllers/` and schema, here is a logical grouping for future microservices:

1. **Content / CMS Service**: Blogs, Pages, Home, Media, Newsletters, Galleries
2. **Event & Race Service**: Events, Stages, Checkpoints, Results, Runners, Volunteers
3. **Trekking & Booking Service**: Treks, Trek Categories, Bookings, Teams
4. **E-commerce Service**: Products, Orders, Store Settings, Coupons
5. **Auth & Identity Service**: Users, Roles, Permissions, Companies, Sponsors

## 3. Database & Authentication Strategy

### Shared Database Approach
Microservices theoretically should have their own isolated databases. However, during this migration, we will start with a **Shared Database**.
- Both the Monolith and the new Microservices will talk to the exact same MariaDB database.
- Once the codebase is fully modularized in the future, we can split the tables into physically separate databases.

### Shared Authentication
Since the Monolith currently verifies JWTs (`[verifyAccessToken]`), the new microservices will **verify the JWT directly inside the new microservices using the same secret key**.
- We will extract the JWT middleware into a shared package or duplicate the verification logic in the new services.
- This ensures each service handles its own authorization cleanly.

## 4. Step-by-Step Migration Process

When you are ready to move your first module (for example, the **Content / CMS** module):

### Phase 1: Setup Infrastructure
1. Create the API Gateway.
2. Point the frontend to the API Gateway instead of the monolith directly.
3. Route 100% of the API Gateway traffic to the monolith. Verify everything still works.

### Phase 2: Extract the Module
1. Create a new Node/Express project (e.g., `content-service`).
2. Copy the relevant controllers (`blog.controller.ts`, `page.controller.ts`), schemas, JWT verification middleware, and Prisma models.
3. Boot up the new service on a new port (e.g., `3001`).

### Phase 3: Route Traffic & Test
1. Update the API Gateway: Route `/api/blogs` and `/api/pages` to port `3001` (Content Service). All other traffic stays on `3000` (Monolith).
2. The monolith still has the blog code, but it is now effectively dead code because the Gateway blocks traffic from reaching it.
3. Once stable, safely delete the blog/page code from the monolith.
