# AWS Flask + Express Deployment

## Project Overview

This project demonstrates deployment of a Flask backend and Express frontend on AWS.

The project will be deployed using three different architectures:

1. Flask backend and Express frontend on a single EC2 instance.
2. Flask backend and Express frontend on separate EC2 instances.
3. Flask backend and Express frontend as Docker containers using Amazon ECR, ECS and VPC.

## Task 1 - Single EC2

For Task 1, both applications run on the same EC2 instance.

### Architecture

Browser
↓
Nginx
↓
Express Frontend
↓
Flask Backend

### Technologies

- AWS EC2
- Ubuntu
- Nginx
- Node.js
- Express
- Python
- Flask
- Gunicorn
- Git
- GitHub

### Local Ports

Express:
3000

Flask:
5050

Nginx:
80

## Local Testing

The Flask backend was tested using:

http://localhost:5050/api/hello

The Express frontend was tested using:

http://localhost:3000

Express successfully communicated with the Flask backend.

## Deployment

Task 1 will deploy both applications on a single AWS EC2 instance.

The final public application URL will be added after deployment.

## GitHub Repository

GitHub repository link will be added here.


