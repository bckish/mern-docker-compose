# MERN Docker Compose

A small, original task-tracking application used to demonstrate a reproducible
Docker Compose development environment. It runs a Node.js API, MongoDB, and a
static frontend as separate containers.

## Run locally

```bash
docker compose up --build
```

Open `http://localhost:8080`. The API health endpoint is
`http://localhost:3000/health`.

## Verify

```bash
curl --fail http://localhost:3000/health
```

## Design

The API waits for MongoDB through a health check, persists tasks in a named
volume, and exposes only the API and frontend ports to the host.
