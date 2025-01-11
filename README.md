

# Running the Service with Docker

This guide will walk you through the steps to build and run the service using Docker.

## Step 1: Build the Docker Image

To build the Docker image for the service, run the following command:

```bash
docker build -t yourapp .
```

This command will build the Docker image with the tag `yourapp`.

## Step 2: Run the Docker Container

Once the image is built, you can run the container with the following command:

```bash
docker run -p 8080:8080 -e PORT=8080 -e DATABASE_URL="mongodb connection string" yourapp
```

### Explanation of the flags:

- `-p 8080:8080`: Maps port `8080` on your local machine to port `8080` in the container.
- `-e PORT=8080`: Sets the `PORT` environment variable inside the container to `8080`.
- `-e DATABASE_URL="mongodb connection string"`: Sets the `DATABASE_URL` environment variable with your MongoDB connection string.

## Multi-Stage Build for Production

This setup uses a multi-stage build to optimize the Docker image for production. The multi-stage build helps keep the final image size smaller by excluding unnecessary build dependencies.


