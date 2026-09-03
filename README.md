# AWS Flask + Express Deployment – 3 Deployment Scenarios

## Project Overview

This project demonstrates deployment of a Flask backend and Express frontend on AWS using three different deployment approaches:

1. **Single EC2 Instance** – Flask backend and Express frontend deployed on the same EC2 instance.
2. **Separate EC2 Instances** – Flask backend and Express frontend deployed on separate EC2 instances.
3. **Containerized Deployment** – Flask backend and Express frontend containerized using Docker and deployed using Amazon ECR, Amazon ECS Fargate and Amazon VPC.

The project also demonstrates Docker image creation, Amazon ECR, ECS task definitions, Fargate networking, security groups, VPC routing and CloudWatch logging.

---

# Project Structure

```text
AWS-Flask-Express-Deployment/
│
├── backend/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── screenshots/
│   ├── task1/
│   ├── task2/
│   └── task3/
│
└── README.md
```

---

# Technologies Used

* Python
* Flask
* Flask-CORS
* Node.js
* Express.js
* HTML/CSS/JavaScript
* Linux
* Git
* GitHub
* Docker
* Amazon EC2
* Amazon ECR
* Amazon ECS
* AWS Fargate
* Amazon VPC
* Security Groups
* Network ACL
* Internet Gateway
* CloudWatch Logs

---

# Application

## Flask Backend

The Flask backend provides the following endpoints:

```text
/
```

Returns:

```json
{
  "message": "Flask Backend is running!"
}
```

### Hello API

```text
/api/hello
```

Returns:

```json
{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
```

### Health API

```text
/api/health
```

Returns:

```json
{
  "status": "healthy"
}
```

The Flask application runs on:

```text
0.0.0.0:5050
```

---

# Task 1 – Flask Backend and Express Frontend on a Single EC2 Instance

## Objective

Deploy both the Flask backend and Express frontend on one Amazon EC2 instance.

## Deployment Process

The application source code was copied to the EC2 instance.

The required dependencies were installed and both applications were configured to run on the EC2 server.

The Flask backend was configured to listen on:

```text
Port 5050
```

The Express frontend was configured to run on its assigned application port.

The EC2 Security Group was configured to allow the required application traffic.

## Verification

The backend API was tested using:

```bash
curl http://localhost:5050/api/hello
```

Successful response:

```json
{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
```

The frontend was accessed through the EC2 public IP address.

## Evidence

Screenshots for Task 1 are available in:

```text
screenshots/task1/
```

The screenshots contain the EC2 instance, terminal commands, application output and deployment verification.

---

# Task 2 – Flask Backend and Express Frontend on Separate EC2 Instances

## Objective

Deploy the Flask backend and Express frontend on two separate Amazon EC2 instances.

## Architecture

```text
                    Internet
                       |
              +--------+--------+
              |                 |
              v                 v
      EC2 Backend         EC2 Frontend
      Flask :5050         Express
              |
              |
        Backend API
```

The Flask backend and Express frontend were separated into independent EC2 instances.

## Backend EC2

The Flask backend was deployed on a dedicated EC2 instance.

Backend application:

```text
Flask
Port: 5050
```

The backend provides:

```text
/api/hello
/api/health
```

## Frontend EC2

The Express frontend was deployed on another EC2 instance.

The frontend communicates with the Flask backend using the backend server address.

## Networking

The EC2 Security Groups were configured to permit the required traffic between the frontend and backend.

The backend port was configured as:

```text
5050
```

## Verification

The backend API was tested using:

```bash
curl http://<BACKEND-IP>:5050/api/hello
```

The frontend was accessed using the public IP address of the frontend EC2 instance.

## Evidence

Screenshots for Task 2 are available in:

```text
screenshots/task2/
```

The screenshots document the EC2 instances, networking configuration, commands and application output.

---

# Task 3 – Docker + Amazon ECR + ECS Fargate + VPC

## Objective

Containerize the Flask backend and deploy it using:

* Docker
* Amazon ECR
* Amazon ECS
* AWS Fargate
* Amazon VPC
* Security Groups
* CloudWatch Logs

---

# Dockerization

## Flask Dockerfile

The Flask backend was containerized using the following Docker configuration:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

EXPOSE 5050

CMD ["python", "app.py"]
```

The application listens on:

```text
5050
```

---

# Local Docker Testing

The Flask Docker image was built locally and tested using Docker.

The container port mapping was:

```text
5050:5050
```

The API was verified locally using:

```bash
curl http://localhost:5050/api/hello
```

Successful response:

```json
{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
```

---

# Amazon ECR

An Amazon ECR repository was created for the Flask backend.

Repository:

```text
flask-backend
```

AWS Region:

```text
ap-south-1
```

ECR image:

```text
883027050039.dkr.ecr.ap-south-1.amazonaws.com/flask-backend:latest
```

The Docker image was pushed to Amazon ECR and used by ECS.

The deployed ECS task used image digest:

```text
sha256:4d50af51c89f067ad807f9f8c07684703b4d40f4d60eeb1a220056f2c0ab8dbe
```

---

# Amazon ECS

An ECS cluster was created:

```text
aws-flask-express-cluster
```

Region:

```text
ap-south-1
```

The cluster uses AWS Fargate for serverless container execution.

## ECS Service

Service:

```text
flask-task-service-tn6bcuuu
```

The service successfully reached a steady state after deployment.

The cluster showed:

```text
1 active service
1 running task
0 pending tasks
```

---

# ECS Task Definition

Task definition family:

```text
flask-task
```

Current revision:

```text
Revision 2
```

Launch type:

```text
FARGATE
```

CPU:

```text
256
```

Memory:

```text
512 MB
```

Network mode:

```text
awsvpc
```

Container:

```text
flask-backend
```

Container port:

```text
5050
```

Port mapping:

```text
5050:5050
```

The ECS task uses:

```text
ecsTaskExecutionRole
```

for pulling the ECR image and sending logs to CloudWatch.

---

# ECS VPC Networking

The ECS task was deployed using:

```text
Network mode: awsvpc
```

VPC:

```text
vpc-0f82fc90d97cc83d0
```

The task was associated with the configured VPC subnets.

The ECS task received a network interface (ENI):

```text
eni-08e0e85232ac842b3
```

The task received:

```text
Private IP: 172.31.26.126
Public IP: 52.66.218.254
```

Public IP assignment was enabled.

---

# VPC Route Table

The subnet route table contained:

```text
172.31.0.0/16 → local
0.0.0.0/0     → Internet Gateway
```

Internet Gateway:

```text
igw-08f6f6b90b9e4483a
```

This provides the subnet with a route towards the Internet.

---

# Security Group

The ECS task used Security Group:

```text
sg-0d20e2bf8569ee252
```

The security configuration was used to permit the required network traffic to the ECS task.

---

# CloudWatch Logs

CloudWatch logging was enabled in Task Definition revision 2.

Log group:

```text
/ecs/flask-task
```

Log driver:

```text
awslogs
```

Region:

```text
ap-south-1
```

The ECS container successfully generated Flask startup logs.

Important logs included:

```text
* Serving Flask app 'app'
* Debug mode: off
* Running on all addresses (0.0.0.0)
* Running on http://127.0.0.1:5050
* Running on http://172.31.26.126:5050
```

These logs confirm that the Flask application started successfully inside the ECS container and was listening on port 5050.

---

# ECS Deployment Troubleshooting

During deployment, the ECS service initially experienced two issues.

## Issue 1 – IAM Execution Role

ECS initially reported:

```text
ECS was unable to assume the role
'ecsTaskExecutionRole'
```

The task execution role configuration was corrected and the task was subsequently launched successfully.

---

## Issue 2 – Docker Image Architecture

An initial deployment reported:

```text
CannotPullContainerError

image Manifest does not contain descriptor matching platform
'linux/amd64'
```

This was related to the Docker image architecture.

The image was rebuilt/pushed with the appropriate architecture and the ECS task subsequently started successfully.

---

# Current Task 3 Status

The Flask backend container is successfully running on ECS Fargate.

The ECS task shows:

```text
Last status: RUNNING
Desired status: RUNNING
```

The container is:

```text
flask-backend
```

The image is:

```text
flask-backend:latest
```

The application is listening on:

```text
0.0.0.0:5050
```

CloudWatch logs confirm successful Flask startup.

The remaining issue is external connectivity to the public IP and port 5050. Requests from the local machine to the ECS public IP timed out even though the container itself was running successfully.

This issue can be further investigated with the mentor using AWS networking/reachability analysis.

---

# Evidence / Screenshots

The project contains screenshots documenting the deployment process.

## Task 1

```text
screenshots/task1/
```

Evidence includes:

* EC2 instance
* Flask backend
* Express frontend
* Terminal commands
* Application output

## Task 2

```text
screenshots/task2/
```

Evidence includes:

* Backend EC2
* Frontend EC2
* Security Groups
* Application deployment
* API testing

## Task 3

```text
screenshots/task3/
```

Evidence includes:

* ECR repository
* ECR image
* ECS cluster
* ECS service
* Running ECS task
* Task definition
* Port mapping
* VPC configuration
* Subnets
* Security Group
* Public IP
* Route table
* Internet Gateway
* CloudWatch Logs
* Flask container startup

---

# GitHub Repository

Complete project source code is available on GitHub:

https://github.com/bhavanagowda28/AWS-Flask-Express-Deployment

---

# Deployment Summary

| Task   | Deployment                                | Status                                                 |
| ------ | ----------------------------------------- | ------------------------------------------------------ |
| Task 1 | Flask + Express on Single EC2             | Completed                                              |
| Task 2 | Flask + Express on Separate EC2 Instances | Completed                                              |
| Task 3 | Docker + ECR + ECS Fargate + VPC          | Deployed / External connectivity under troubleshooting |

---

# Cost Management

AWS resources can generate charges when they are running.

After completing the required screenshots and submission:

* Stop EC2 instances when they are not required.
* Stop/remove ECS services and running tasks when they are no longer required.
* Delete unused load balancers, NAT gateways, EBS volumes and other billable resources.
* Delete unused ECR images/repositories if they are no longer required.
* Check the AWS Billing dashboard after cleanup.

The AWS resources should not be left running unnecessarily after evaluation.

---

# Final Submission Structure

The final submission ZIP should contain:

```text
AWS_Bhavana/
│
├── README.md
│
├── Task-1-Single-EC2/
│   ├── backend/
│   ├── frontend/
│   └── screenshots/
│
├── Task-2-Separate-EC2/
│   ├── backend/
│   ├── frontend/
│   └── screenshots/
│
└── Task-3-ECR-ECS-VPC/
    ├── backend/
    ├── frontend/
    └── screenshots/
```

The complete folder should be compressed as:

```text
AWS_Bhavana.zip
```

Only the ZIP file should be uploaded to the assignment submission portal.

---

# Conclusion

This project demonstrates three approaches for deploying a Flask backend and Express frontend:

1. Traditional deployment on a single EC2 instance.
2. Distributed deployment using separate EC2 instances.
3. Containerized deployment using Docker, Amazon ECR, Amazon ECS Fargate and Amazon VPC.

The project also demonstrates AWS networking, security groups, container image management, ECS task definitions, Fargate deployment and CloudWatch logging.

