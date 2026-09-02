# AWS Flask + Express Deployment on EC2

A full-stack web application deployed on **Amazon EC2**, consisting of a **Python Flask backend** and a **Node.js Express frontend**, with **Nginx configured as a reverse proxy**.

This project demonstrates practical DevOps skills including AWS EC2 provisioning, Linux administration, SSH, security groups, application deployment, API communication, Nginx reverse proxy configuration, troubleshooting, and Git/GitHub.

---

## 📌 Project Overview

The application contains two services:

* **Frontend:** Node.js + Express.js
* **Backend:** Python + Flask
* **Reverse Proxy:** Nginx
* **Cloud Platform:** Amazon EC2
* **Operating System:** Ubuntu Server 24.04 LTS
* **Version Control:** Git + GitHub

The Express frontend communicates with the Flask backend through an internal API request.

Nginx acts as the public entry point and forwards incoming HTTP requests to the Express application.

---

## 🏗️ Architecture

```text
                         Internet
                            |
                            |
                     EC2 Public IP :80
                            |
                            v
                    +---------------+
                    |     Nginx     |
                    | Reverse Proxy |
                    +---------------+
                            |
                            v
                    Express.js :3000
                    Frontend Server
                            |
                            | Internal API Request
                            v
                     Flask :5050
                    Backend Server
                            |
                            v
                       JSON Response
```

### Request Flow

```text
Client
  |
  v
Nginx :80
  |
  v
Express.js :3000
  |
  v
Flask :5050
  |
  v
JSON Response
```

---

## 🛠️ Technologies Used

| Technology       | Purpose                      |
| ---------------- | ---------------------------- |
| AWS EC2          | Cloud compute server         |
| Ubuntu 24.04 LTS | Server operating system      |
| Linux            | Server administration        |
| Nginx            | Web server and reverse proxy |
| Node.js          | JavaScript runtime           |
| Express.js       | Frontend/server application  |
| Python           | Backend programming language |
| Flask            | REST API backend             |
| Flask-CORS       | Cross-origin request support |
| Git              | Version control              |
| GitHub           | Source code repository       |
| cURL             | API and connectivity testing |

---

## 📁 Project Structure

```text
AWS-Flask-Express-Deployment/
│
├── backend/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── screenshots/
│   ├── 01-flask-local-running.png
│   ├── 02-flask-api-response.png
│   ├── 03-express-server-running.png
│   ├── 04-full-stack-local-test.png
│   ├── 05-git-staged-files.png
│   ├── 06-github-repository.png
│   ├── 07-ec2-ami-instance-type.png
│   ├── 08-ec2-security-group.png
│   ├── 09-ssh-ec2-login.png
│   ├── 10-ubuntu-update-kernel.png
│   ├── 11-ec2-software-check.png
│   ├── 12-nginx-running.png
│   ├── 13-mac-to-ec2-http-test.png
│   ├── 14-github-project-on-ec2.png
│   ├── 15-flask-running-ec2.png
│   ├── 16-flask-api-tests-ec2.png
│   ├── 17-express-running-ec2.png
│   └── 18-frontend-flask-api.png
│
├── .gitignore
└── README.md
```

> The Python virtual environment and `node_modules` are excluded from Git using `.gitignore`.

---

# 🚀 Local Development

## Prerequisites

Install the following:

* Python 3
* Node.js
* npm
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/bhavanagowda28/AWS-Flask-Express-Deployment.git
cd AWS-Flask-Express-Deployment
```

---

# 🐍 Backend – Flask

## 2. Navigate to the Backend

```bash
cd backend
```

## 3. Create a Python Virtual Environment

```bash
python3 -m venv venv
```

## 4. Activate the Virtual Environment

### macOS / Linux

```bash
source venv/bin/activate
```

## 5. Install Dependencies

```bash
pip install -r requirements.txt
```

## 6. Start Flask

```bash
python3 app.py
```

The Flask backend runs on:

```text
http://localhost:5050
```

---

# 🔌 Flask API Endpoints

## Home

```text
GET /
```

Example response:

```json
{
  "message": "Flask Backend is running!"
}
```

## Hello API

```text
GET /api/hello
```

Example response:

```json
{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
```

## Health Check

```text
GET /api/health
```

Example response:

```json
{
  "status": "healthy"
}
```

---

# 🟢 Frontend – Express.js

Open another terminal.

Navigate to the frontend:

```bash
cd AWS-Flask-Express-Deployment/frontend
```

Install dependencies:

```bash
npm install
```

Start the Express application:

```bash
node server.js
```

The Express server runs on:

```text
http://localhost:3000
```

---

# 🔌 Express API Endpoints

## Frontend Test

```text
GET /api/frontend
```

Example response:

```json
{
  "message": "Express Frontend is running!",
  "status": "success"
}
```

## Backend Communication Test

```text
GET /api/backend
```

This endpoint sends a request from Express to the Flask backend.

The Express application internally calls:

```text
http://127.0.0.1:5050/api/hello
```

Example response:

```json
{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
```

This confirms successful **Express → Flask communication**.

---

# ☁️ AWS EC2 Deployment

The application was deployed on:

* **AWS Service:** Amazon EC2
* **Region:** Asia Pacific (Mumbai)
* **Operating System:** Ubuntu Server 24.04 LTS

The EC2 instance hosted both the Express frontend and Flask backend.

### Application Ports

| Service    | Port | Purpose              |
| ---------- | ---: | -------------------- |
| Nginx      |   80 | Public HTTP access   |
| Express.js | 3000 | Frontend application |
| Flask      | 5050 | Backend API          |

---

# 🔐 AWS Security Group

The EC2 Security Group was configured with:

| Type | Protocol | Port | Source    |
| ---- | -------- | ---: | --------- |
| SSH  | TCP      |   22 | My IP     |
| HTTP | TCP      |   80 | 0.0.0.0/0 |

### Security Approach

* SSH access was restricted to the administrator's public IP.
* HTTP port `80` was opened for public web access.
* Express port `3000` and Flask port `5050` were used internally.
* The application was accessed publicly through Nginx.

---

# 🌐 Nginx Reverse Proxy

Nginx was configured as the public-facing web server.

Instead of accessing Express directly on port `3000`, users access:

```text
http://<EC2-PUBLIC-IP>
```

Nginx listens on port `80` and forwards requests to:

```text
http://127.0.0.1:3000
```

### Nginx Configuration

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Test the Nginx configuration:

```bash
sudo nginx -t
```

Reload Nginx:

```bash
sudo systemctl reload nginx
```

Check Nginx status:

```bash
sudo systemctl status nginx --no-pager
```

---

# 🧪 Deployment Verification

The deployment was tested at multiple levels.

## 1. Verify Flask

```bash
curl http://localhost:5050
```

Expected:

```json
{
  "message": "Flask Backend is running!"
}
```

---

## 2. Verify Flask API

```bash
curl http://localhost:5050/api/hello
```

Expected:

```json
{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
```

---

## 3. Verify Flask Health Check

```bash
curl http://localhost:5050/api/health
```

Expected:

```json
{
  "status": "healthy"
}
```

---

## 4. Verify Express

```bash
curl http://localhost:3000/api/frontend
```

Expected:

```json
{
  "message": "Express Frontend is running!",
  "status": "success"
}
```

---

## 5. Verify Express → Flask Communication

```bash
curl http://localhost:3000/api/backend
```

Expected:

```json
{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
```

This confirms that Express successfully communicates with Flask.

---

## 6. Verify Nginx

```bash
curl -I http://localhost
```

Expected:

```text
HTTP/1.1 200 OK
Server: nginx
X-Powered-By: Express
```

---

## 7. Verify Public EC2 Access

```bash
curl -I http://<EC2-PUBLIC-IP>
```

Expected:

```text
HTTP/1.1 200 OK
Server: nginx
X-Powered-By: Express
```

The application can also be accessed from a web browser using:

```text
http://<EC2-PUBLIC-IP>
```

---

# 🔄 Complete Request Flow

```text
                        INTERNET
                            |
                            v
                  EC2 Public IP :80
                            |
                            v
                    +---------------+
                    |     NGINX     |
                    | Reverse Proxy |
                    +---------------+
                            |
                            v
                    EXPRESS :3000
                            |
                            | HTTP Request
                            v
                     FLASK :5050
                            |
                            v
                      JSON Response
                            |
                            v
                    EXPRESS :3000
                            |
                            v
                         NGINX
                            |
                            v
                         CLIENT
```

---

# 🧰 Troubleshooting

During deployment, several common issues were identified and resolved.

## Flask Port Conflict

If port `5050` is already in use:

```bash
sudo ss -lntp | grep ':5050'
```

This identifies the process using the port.

---

## Checking Listening Ports

```bash
sudo ss -lntp
```

This can be used to verify whether Nginx, Express, and Flask are listening on their expected ports.

---

## Nginx Configuration Test

Before reloading Nginx:

```bash
sudo nginx -t
```

A successful configuration test should be completed before reloading the service.

---

## Checking Nginx Status

```bash
sudo systemctl status nginx --no-pager
```

Expected:

```text
Active: active (running)
```

---

# 📸 Screenshots

The `screenshots/` directory contains evidence of the complete deployment process.

### Local Application

* Flask running locally
* Flask API response
* Express server running
* Full-stack local testing

### Git & GitHub

* Git staging
* GitHub repository

### AWS EC2

* EC2 instance configuration
* Security Group configuration
* SSH connection
* Ubuntu setup
* Software verification

### Nginx & Deployment

* Nginx running
* HTTP connectivity test
* Project cloned on EC2
* Flask running on EC2
* Flask API tests
* Express running on EC2
* Final frontend and Flask API communication

---

# 🔒 Security

The following security practices were followed:

* SSH access was restricted to the administrator's IP.
* Only required public traffic was exposed.
* Flask and Express were used internally.
* Sensitive credentials were not included in the repository.
* `.env` files are ignored through `.gitignore`.
* Python virtual environment is ignored.
* Node.js `node_modules` is ignored.

Never commit:

```text
*.pem
.env
passwords
API keys
AWS credentials
```

---

# 🧹 AWS Resource Cleanup

After completing testing, AWS resources should be cleaned up to avoid unnecessary charges.

Before cleanup:

1. Push the final project to GitHub.
2. Verify the README.
3. Verify all screenshots.
4. Check that no credentials or private keys are committed.
5. Terminate the EC2 instance.
6. Check for unused Elastic IP addresses.
7. Check for unused EBS volumes.
8. Check for snapshots or other billable resources.
9. Review the AWS Billing dashboard.

> Terminating an EC2 instance stops the instance itself, but other AWS resources may continue to incur charges if they remain active.

---

# 🎯 DevOps Skills Demonstrated

This project demonstrates practical experience with:

* AWS EC2
* Linux
* Ubuntu
* SSH
* AWS Security Groups
* Git
* GitHub
* Python
* Flask
* REST APIs
* Node.js
* Express.js
* Nginx
* Reverse Proxy
* HTTP
* Port Management
* cURL
* Application-to-application communication
* Troubleshooting
* Cloud deployment
* AWS resource cleanup

---

# 📚 Key Learnings

Through this project, I learned how to:

1. Launch and configure an AWS EC2 instance.
2. Connect to an Ubuntu EC2 server using SSH.
3. Configure AWS Security Groups.
4. Install and configure Nginx.
5. Deploy a Flask backend.
6. Deploy an Express.js frontend.
7. Connect Express.js with Flask.
8. Configure Nginx as a reverse proxy.
9. Test REST APIs using cURL.
10. Troubleshoot application and port conflicts.
11. Verify connectivity between services.
12. Manage source code using Git and GitHub.
13. Deploy and verify a full-stack application on AWS.
14. Clean up AWS resources after deployment.

---

# 🏁 Project Outcome

Successfully deployed a **Flask + Express.js full-stack application on a single AWS EC2 instance**.

The final architecture is:

```text
Internet
   |
   v
Nginx :80
   |
   v
Express.js :3000
   |
   v
Flask :5050
   |
   v
JSON Response
```

The final deployment successfully demonstrated:

**Client → Nginx → Express → Flask → Express → Nginx → Client**

---

# 👩‍💻 Author

## Bhavana S Gowda

DevOps / Cloud Engineering Learner

### GitHub

https://github.com/bhavanagowda28

### Project Repository

https://github.com/bhavanagowda28/AWS-Flask-Express-Deployment
