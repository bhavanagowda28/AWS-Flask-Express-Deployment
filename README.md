# AWS Flask + Express Deployment

## Project Overview

This project demonstrates the deployment of a full-stack application consisting of:

* **Flask** backend
* **Express.js** frontend
* **Docker**
* **Amazon ECR**
* **Amazon ECS / Fargate**
* **Amazon VPC**
* **Amazon EC2**

The assignment was completed in three deployment scenarios:

1. Flask backend and Express frontend on a **single EC2 instance**
2. Flask backend and Express frontend on **separate EC2 instances**
3. Flask backend and Express frontend using **Docker containers with ECR, ECS and VPC**

---

# Application Architecture

```text
                    AWS DEPLOYMENT
                         |
          +--------------+--------------+
          |              |              |
       Task 1         Task 2         Task 3
          |              |              |
     Single EC2     Separate EC2    Dockerized
          |          Instances        |
     +----+----+     +------+-----+    |
     |         |     |            |    |
  Flask    Express Flask       Express ECR
 Backend   Frontend Backend    Frontend  |
                                      ECS/Fargate
                                          |
                                         VPC
```

---

# Technologies Used

## Application

* Python
* Flask
* Flask-CORS
* Node.js
* Express.js
* JavaScript
* HTML

## DevOps / Cloud

* Git
* GitHub
* Docker
* Docker Compose
* Amazon EC2
* Amazon ECR
* Amazon ECS
* AWS Fargate
* Amazon VPC
* Security Groups
* CloudWatch Logs

---

# Project Structure

```text
AWS-Flask-Express-Deployment/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
│
├── screenshots/
│   ├── task1/
│   ├── task2/
│   └── task3/
│
└── README.md
```

---

# Flask Backend

The Flask backend provides the following API endpoints:

### Home

```text
/
```

Response:

```json
{
  "message": "Flask Backend is running!"
}
```

### Hello API

```text
/api/hello
```

Response:

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

Response:

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

# Task 1 — Flask Backend + Express Frontend on Single EC2

## Objective

Deploy both the Flask backend and Express frontend on a single Amazon EC2 instance.

## Deployment

An EC2 instance was created and configured with the required software.

The application components were deployed on the same EC2 machine:

```text
EC2 Instance
│
├── Flask Backend
│   └── Port 5050
│
└── Express Frontend
    └── Frontend Port
```

## Steps Performed

1. Created an EC2 instance.
2. Connected to the instance using SSH.
3. Installed the required dependencies.
4. Copied the Flask backend to the EC2 instance.
5. Copied the Express frontend to the EC2 instance.
6. Installed Python and Node.js dependencies.
7. Started the Flask backend.
8. Started the Express frontend.
9. Configured the EC2 Security Group.
10. Tested the application using the public IP address.

## Backend Test

The Flask backend was tested using:

```bash
curl http://localhost:5050/api/hello
```

Expected response:

```json
{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
```

## Result

The single EC2 deployment was successfully tested.

### Evidence

Screenshots for Task 1 are available in:

```text
screenshots/task1/
```

---

# Task 2 — Flask Backend + Express Frontend on Separate EC2 Instances

## Objective

Deploy the Flask backend and Express frontend on two separate EC2 instances.

## Architecture

```text
                 Internet
                    |
          +---------+---------+
          |                   |
          v                   v
   EC2 Instance 1       EC2 Instance 2
   Flask Backend        Express Frontend
     Port 5050            Frontend Port
          |                   |
          +---------+---------+
                    |
                 API Calls
```

## Backend EC2

The Flask backend was deployed separately on an EC2 instance.

Backend:

```text
Flask
Port: 5050
```

The backend API was tested with:

```bash
curl http://<BACKEND_PUBLIC_IP>:5050/api/hello
```

## Frontend EC2

The Express frontend was deployed on a separate EC2 instance.

The frontend communicates with the Flask backend through the backend EC2 public IP.

## Security Configuration

The EC2 Security Groups were configured to allow the required application traffic.

The backend port used for Flask was:

```text
5050/TCP
```

## Result

The separate-instance deployment was configured and tested as part of the assignment.

### Evidence

Screenshots for Task 2 are available in:

```text
screenshots/task2/
```

---

# Task 3 — Docker + ECR + ECS + VPC

## Objective

Containerize the Flask backend and Express frontend and deploy the containers using:

* Docker
* Amazon ECR
* Amazon ECS
* AWS Fargate
* Amazon VPC

---

# Docker Configuration

## Flask Dockerfile

The Flask backend uses a Dockerfile based on Python.

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

EXPOSE 5050

CMD ["python", "app.py"]
```

The container listens on:

```text
5050
```

---

# Docker Compose

Docker Compose was used for local container testing.

The backend container exposes:

```text
5050:5050
```

The application was tested locally using:

```bash
curl http://localhost:5050/api/hello
```

Expected response:

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

Region:

```text
ap-south-1
```

The Docker image was pushed to:

```text
883027050039.dkr.ecr.ap-south-1.amazonaws.com/flask-backend:latest
```

The deployed ECS task used the ECR image.

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

Launch type:

```text
AWS Fargate
```

Network mode:

```text
awsvpc
```

The ECS service was configured with one running task.

---

# ECS Task Definition

Task definition:

```text
flask-task
```

Revision:

```text
2
```

CPU:

```text
256
```

Memory:

```text
512 MB
```

Container:

```text
flask-backend
```

Container port:

```text
5050
```

Host port:

```text
5050
```

Protocol:

```text
TCP
```

---

# CloudWatch Logging

CloudWatch logging was configured for the ECS task.

Log group:

```text
/ecs/flask-task
```

The ECS container successfully produced Flask startup logs.

Example:

```text
Serving Flask app 'app'
Debug mode: off
Running on all addresses (0.0.0.0)
Running on http://127.0.0.1:5050
```

The ECS task was therefore successfully starting the Flask application inside the container.

---

# VPC Configuration

The ECS task was deployed using:

```text
VPC:
vpc-0f82fc90d97cc83d0
```

Network mode:

```text
awsvpc
```

Subnets used:

```text
subnet-07c1563da0b1c1a24
subnet-06dd99f2a6b5d9e2c
subnet-039474f7f39b0f2c3
```

The ECS task received a public IP address.

Example ECS task network configuration:

```text
Private IP:
172.31.26.126

Public IP:
52.66.218.254
```

---

# Route Table

The subnet route table contained:

```text
172.31.0.0/16 → local
0.0.0.0/0      → Internet Gateway
```

Internet Gateway:

```text
igw-08f6f6b90b9e4483a
```

This provided the subnet with a route toward the internet.

---

# Security Group

The ECS task used:

```text
Security Group:
sg-0d20e2bf8569ee252
```

The Security Group allowed inbound traffic required for testing.

---

# ECS Connectivity Issue

The Flask container successfully started inside ECS and CloudWatch confirmed that the application was listening on:

```text
0.0.0.0:5050
```

The ECS task also received a public IP.

However, external testing of:

```bash
curl http://52.66.218.254:5050/api/hello
```

timed out.

Local testing of the same Flask application worked successfully:

```bash
curl http://localhost:5050/api/hello
```

Response:

```json
{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
```

Therefore, the remaining issue is external network connectivity to the ECS task on port 5050 rather than the Flask application itself.

This includes checking the ECS networking configuration, security group/NACL rules, subnet routing and the frontend-to-backend connectivity.

The issue was documented rather than claiming a successful public endpoint without verification.

---

# AWS Resources Created

## EC2

Used for:

* Task 1 — Single EC2 deployment
* Task 2 — Separate EC2 deployment

## ECR

Repository:

```text
flask-backend
```

## ECS

Cluster:

```text
aws-flask-express-cluster
```

Task definition:

```text
flask-task
```

Launch type:

```text
Fargate
```

## VPC

Used for ECS networking with:

```text
awsvpc
```

## CloudWatch

Used to collect ECS container logs.

---

# Local Docker Testing

To build the Flask Docker image:

```bash
docker build -t flask-test .
```

To run the container:

```bash
docker run --rm -p 5050:5050 flask-test
```

If port 5050 is already being used, another host port can be mapped:

```bash
docker run --rm -p 5051:5050 flask-test
```

The application can then be tested with:

```bash
curl http://localhost:5050/api/hello
```

or:

```bash
curl http://localhost:5051/api/hello
```

---

# GitHub Repository

GitHub repository:

https://github.com/bhavanagowda28/AWS-Flask-Express-Deployment

The repository contains the application source code, Docker configuration and deployment documentation.

---

# Deployment Evidence

Screenshots and command outputs are included with the submission.

Recommended evidence organization:

```text
screenshots/
│
├── task1/
│   ├── EC2-instance.png
│   ├── security-group.png
│   ├── backend-test.png
│   └── frontend-test.png
│
├── task2/
│   ├── backend-ec2.png
│   ├── frontend-ec2.png
│   ├── security-group.png
│   └── application-test.png
│
└── task3/
    ├── ecr-repository.png
    ├── ecr-image.png
    ├── ecs-cluster.png
    ├── ecs-service.png
    ├── ecs-task-running.png
    ├── task-definition.png
    ├── vpc.png
    ├── subnet.png
    ├── route-table.png
    ├── security-group.png
    ├── cloudwatch-logs.png
    └── ecs-networking.png
```

---

# Cost Management

AWS resources were created for learning and assignment purposes.

To avoid unnecessary AWS charges:

* Stop EC2 instances when they are not being used.
* Stop or terminate unused EC2 resources.
* Delete unused ECS services/tasks.
* Remove unused ECR images if no longer required.
* Check running resources in the AWS Console.
* Monitor AWS Billing regularly.

For final submission, AWS resources should be stopped or removed where appropriate after screenshots and evidence have been captured.

---

# Learning Outcomes

Through this project, I practiced:

* Deploying applications on Amazon EC2
* Working with Linux servers
* Configuring Security Groups
* Running Flask applications
* Running Express.js applications
* Creating Docker images
* Running Docker containers
* Using Docker port mappings
* Creating and using Amazon ECR
* Creating ECS clusters
* Creating ECS task definitions
* Deploying containers using AWS Fargate
* Configuring VPC networking
* Working with subnets and route tables
* Configuring public IP networking
* Using CloudWatch Logs
* Troubleshooting AWS networking issues
* Using Git and GitHub for version control

---

# Conclusion

This project demonstrates the progression from a traditional EC2 deployment to a containerized AWS deployment.

The three scenarios covered are:

```text
Task 1
Single EC2
      ↓
Flask + Express
```

```text
Task 2
Separate EC2 Instances
      ↓
Flask EC2 + Express EC2
```

```text
Task 3
Docker
  ↓
ECR
  ↓
ECS/Fargate
  ↓
VPC
  ↓
CloudWatch
```

The Flask application was successfully containerized and launched through ECS/Fargate, with CloudWatch confirming that the container was running and listening on port 5050. The remaining external connectivity issue is documented in the Task 3 troubleshooting section.

