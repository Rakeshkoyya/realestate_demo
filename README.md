# Sahra Estates — real estate demo site

Next.js 16 (App Router) + Tailwind v4 + Motion. Demo content only: the brand, listings and people are fictional; photos are from Unsplash.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy on Dokploy

The repo ships a multi-stage `Dockerfile` that builds Next.js in `standalone` mode and runs it as a non-root user on port **3000**.

1. Push this project to a Git repository (GitHub, GitLab, Gitea…).
2. In Dokploy: **Create Application** → connect the repository and branch.
3. **Build Type:** `Dockerfile` (path `./Dockerfile`, context `.`).
4. **Domains:** add your domain, set **Container Port** to `3000`, enable HTTPS (Let's Encrypt).
5. Optional **Health check** path: `/api/health` (the image also defines a Docker `HEALTHCHECK`).
6. **Deploy.**

No environment variables are required. Optional ones:

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `3000` | Port the server listens on (change the Dokploy container port to match) |
| `HOSTNAME` | `0.0.0.0` | Bind address inside the container |

## Notes

- Forms post to `/api/enquiry`, which validates and returns a reference number but does not send email or store data. Wire it to a CRM or mail service before real use.
- Rate limiting on `/api/enquiry` is in-memory, per container.
