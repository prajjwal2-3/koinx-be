

## Running the Service with Docker

This guide will walk you through the steps to build and run the service using Docker.

### Step 1: Build the Docker Image

To build the Docker image for the service, run the following command:

```bash
docker build -t yourapp .
```

This command will build the Docker image with the tag `yourapp`.

### Step 2: Run the Docker Container

Once the image is built, you can run the container with the following command:

```bash
docker run -p 8080:8080 -e PORT=8080 -e DATABASE_URL="mongodb connection string" yourapp
```

#### Explanation of the flags:

- `-p 8080:8080`: Maps port `8080` on your local machine to port `8080` in the container.
- `-e PORT=8080`: Sets the `PORT` environment variable inside the container to `8080`.
- `-e DATABASE_URL="mongodb connection string"`: Sets the `DATABASE_URL` environment variable with your MongoDB connection string.

### Multi-Stage Build for Production

This setup uses a multi-stage build to optimize the Docker image for production. The multi-stage build helps keep the final image size smaller by excluding unnecessary build dependencies.

<img src="https://res.cloudinary.com/dzkldv06d/image/upload/v1736613072/Screenshot_2025-01-11_215213_pennzk.png" alt="GitHub Logo" width="550"/>

### Deployment Strategies

1. **Containerizing the Entire Application on EC2**  
   - **Pros:** Simple setup, consistent environment, easy to scale.  
   - **Cons:** Resources are always allocated (long running process), even for lightweight background tasks, leading to higher costs. Any failure impacts the entire application.

2. **Using Kubernetes with a Cron Resource**  
   - **Pros:** Scalable, robust, and ideal for managing complex workloads.  
   - **Cons:** Overhead of setting up and managing Kubernetes for a lightweight job. Higher costs and complexity for small-scale tasks.

3. **My Approach: Splitting into Two Services**  
   - **HTTP Service:** Handles API requests, containerized and deployed on EC2 (If serving verr high traffic) otherwise lambda.  
   - **Background Job:** AWS Lambda fetches data from CoinGecko and updates the database. EventBridge invokes the Lambda every 2 hours.

   **Pros:**  
   - Cost-efficient: Lambda runs only when needed.  
   - Resilient: HTTP service and background job are independent, ensuring no downtime if one fails.  
   - Simplified setup for lightweight background tasks.
   **Cons:** Limited control over serverless environments and potential latency in Lambda cold starts.  

This approach balances cost, reliability, and scalability, making it ideal for current needs.


