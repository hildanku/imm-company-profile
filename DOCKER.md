# Docker Environment Setup for IMM Profile

This document provides instructions for setting up and using Docker environments for development and production.

## Available Docker Configurations

- `Dockerfile.dev` - Development environment configuration
- `Dockerfile.prod` - Production environment configuration
- `docker-compose.yml` - Docker Compose configuration for orchestrating both environments

## Development Environment

The development environment provides hot-reloading and other development features.

### Build the Development Image

```bash
docker build -t imm-profile:dev -f Dockerfile.dev .
```

### Run the Development Container

```bash
docker run -d -p 5173:5173 -v $(pwd):/app -v /app/node_modules --name imm-profile-dev imm-profile:dev
```

### Using Docker Compose for Development

```bash
docker-compose up app-dev
```

## Production Environment

The production environment builds an optimized version of the application and serves it using Nginx.

### Build the Production Image

```bash
docker build -t imm-profile:prod -f Dockerfile.prod .
```

### Run the Production Container

```bash
docker run -d -p 8085:80 --name imm-profile-prod imm-profile:prod
```

### Using Docker Compose for Production

```bash
docker-compose up app-prod
```

## Using Docker Compose

Docker Compose allows you to run both environments or choose which one to run.

### Start Both Environments

```bash
docker-compose up
```

### Start Only Development Environment

```bash
docker-compose up app-dev
```

### Start Only Production Environment

```bash
docker-compose up app-prod
```

### Run in Detached Mode

```bash
docker-compose up -d
```

### Stop Containers

```bash
docker-compose down
```

## Environment Variables

For production, you may need to set environment variables. You can do this by:

1. Uncommenting the environment section in docker-compose.yml
2. Adding your environment variables there
3. Or creating a .env file and referencing it in docker-compose.yml

## Network Configuration

The docker-compose.yml file creates a custom network called `imm-network`. All containers will be connected to this network.

## SPA Routing Configuration

This project includes a custom Nginx configuration (`nginx.conf`) that handles client-side routing for the Single Page Application. This configuration ensures that routes like `/about`, `/career`, `/blog`, etc. work correctly by redirecting all requests to the `index.html` file, allowing the React Router to handle the routing on the client side.

The key configuration is:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

This tells Nginx to:
1. Try to serve the requested URI directly
2. If that fails, try the URI with a trailing slash
3. If both fail, serve the index.html file, which will initialize the React app

## Legacy Commands (For Reference)

```bash
# Build legacy image
docker build -t imm:v2-stag .

# Run legacy container
docker run -d -p 8085:8085 --name my-app-container --network="host" <IMAGE NAME>:latest