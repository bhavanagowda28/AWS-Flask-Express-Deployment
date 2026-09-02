# AWS Flask + Express Full-Stack Deployment on EC2

A full-stack web application deployed on **Amazon EC2**, consisting of a **Flask backend** and an **Express.js frontend**, with **Nginx configured as a reverse proxy**.

The project demonstrates Linux server administration, AWS EC2 deployment, application-to-application communication, reverse proxy configuration, networking, API testing, and troubleshooting.

---

## 📌 Project Overview

This project demonstrates how to deploy a full-stack application on a single AWS EC2 instance.

### Application Components

* **Frontend:** Node.js + Express.js
* **Backend:** Python + Flask
* **Web Server:** Nginx
* **Cloud Platform:** Amazon EC2
* **Operating System:** Ubuntu Server 24.04 LTS
* **Version Control:** Git + GitHub
* **API Communication:** Express.js → Flask
* **Testing:** Browser + cURL

The application is accessed through Nginx on HTTP port `80`.

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
│   ├── 13-aws-deployed-frontend.png
│   └── 18-frontend-flask-api.png
│
├── .gitignore
└── README.md
```

> The Python virtual environment and `node_modules` should not be committed to GitHub. They are recreated during setup.

---

# 🚀 Local Development

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

## Home Endpoint

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

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Express server:

```bash
node server.js
```

The Express application runs on:

```text
http://localhost:3000
```

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

The EC2 Security Group was configured with the following inbound rules:

| Type | Protocol | Port | Source    |
| ---- | -------- | ---: | --------- |
| SSH  | TCP      |   22 | My IP     |
| HTTP | TCP      |   80 | 0.0.0.0/0 |

SSH access was restricted to the administrator's public IP.

HTTP port `80` was exposed to allow users to access the application through a web browser.

The Flask and Express application ports were not required to be publicly exposed because Nginx handled public HTTP traffic.

---

# 🌐 Nginx Reverse Proxy

Nginx was configured as the public-facing web server.

Users access:

```text
http://<EC2-PUBLIC-IP>
```

Nginx listens on port `80` and forwards requests to Express running on port `3000`.

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

After modifying the configuration:

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

The deployment was verified using several connectivity and API tests.

## 1. Check Nginx

```bash
sudo systemctl status nginx --no-pager
```

Expected:

```text
Active: active (running)
```

## 2. Check Port 80

```bash
sudo ss -lntp | grep ':80'
```

Expected:

```text
0.0.0.0:80
[::]:80
```

## 3. Test Flask

```bash
curl http://localhost:5050
```

Expected:

```json
{
  "message": "Flask Backend is running!"
}
```

## 4. Test Flask Hello API

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

## 5. Test Flask Health API

```bash
curl http://localhost:5050/api/health
```

Expected:

```json
{
  "status": "healthy"
}
```

## 6. Test Express

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

## 7. Test Express → Flask Communication

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

This confirms that the Express application successfully communicates with the Flask backend.

## 8. Test Nginx → Express

```bash
curl -I http://localhost
```

Expected:

```text
HTTP/1.1 200 OK
Server: nginx
X-Powered-By: Express
```

## 9. Test the Public EC2 Endpoint

```bash
curl -I http://<EC2-PUBLIC-IP>
```

Expected:

```text
HTTP/1.1 200 OK
Server: nginx
X-Powered-By: Express
```

---

# ✅ Final Deployment Result

The application was successfully deployed and tested through the EC2 public IP.

Final request flow:

```text
Internet
   |
   v
AWS EC2
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

The frontend successfully communicated with the Flask backend and returned:

```json
{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
```

---

# 📸 Screenshots

The `screenshots/` directory contains evidence of the development and deployment process, including:

* Flask running locally
* Flask API response
* Express server running
* Full-stack local testing
* AWS EC2 deployment
* Security Group configuration
* Nginx configuration
* Final deployed frontend
* Express → Flask API communication

These screenshots provide visual evidence of the application's setup, deployment, and successful testing.

---

# 🔒 Security Considerations

The following security practices were followed:

* SSH access was restricted to the administrator's IP.
* Only HTTP port `80` was exposed publicly.
* Flask was accessed internally by Express.
* Express communicated with Flask through localhost.
* The EC2 private key was protected using appropriate file permissions.

Example:

```bash
chmod 400 <your-key-file>.pem
```

> Never commit `.pem` files, passwords, API keys, credentials, or `.env` files to GitHub.

---

# 🧹 AWS Cleanup

Because the EC2 instance was used for deployment and testing, AWS resources should be cleaned up after completing the project.

Before cleanup:

1. Push all required source code to GitHub.
2. Verify the README and screenshots.
3. Verify that no sensitive files were committed.
4. Terminate the EC2 instance.
5. Check for unused Elastic IP addresses.
6. Check for unused EBS volumes.
7. Check for snapshots or other chargeable resources.
8. Check the AWS Billing dashboard for remaining resources.

> Terminating an EC2 instance stops compute usage, but other AWS resources can continue generating charges if they remain active.

---

# 🛠️ Troubleshooting Performed

## SSH Connection Issue

SSH access initially failed because the Security Group and source IP configuration needed to be verified.

The Security Group was updated to allow SSH from the current public IP.

---

## Nginx Browser Timeout

Nginx was checked using:

```bash
sudo ss -lntp | grep ':80'
```

The EC2 public IP was then tested using:

```bash
curl -I http://<EC2-PUBLIC-IP>
```

The server returned:

```text
HTTP/1.1 200 OK
```

This confirmed that the EC2 network, Nginx, and application were responding correctly.

---

## Flask Port Conflict

Flask reported:

```text
Address already in use
Port 5050 is in use by another program.
```

The process using the port was identified using:

```bash
sudo ss -lntp | grep ':5050'
```

The existing Flask process was identified and the API was tested successfully.

---

## npm Installation Directory Issue

Running:

```bash
npm install
```

from the home directory failed because there was no `package.json` there.

The correct directory was:

```bash
cd ~/AWS-Flask-Express-Deployment/frontend
```

Then:

```bash
npm install
```

completed successfully.

---

# 🎯 Key DevOps Concepts Demonstrated

This project provided practical experience with:

* AWS EC2
* Linux server administration
* SSH
* AWS Security Groups
* Public and private networking
* Git and GitHub
* Python virtual environments
* Flask REST APIs
* Node.js
* Express.js
* Nginx
* Reverse proxy
* Port management
* Application communication
* cURL testing
* Troubleshooting
* Deployment verification
* AWS resource cleanup

---

# 📚 What I Learned

Through this project, I practiced:

1. Launching and configuring an EC2 instance.
2. Working with Ubuntu Linux.
3. Connecting to an EC2 server using SSH.
4. Configuring AWS Security Groups.
5. Installing and configuring Nginx.
6. Deploying a Flask backend.
7. Deploying an Express.js frontend.
8. Connecting Express.js with Flask.
9. Testing REST APIs using cURL.
10. Configuring Nginx as a reverse proxy.
11. Troubleshooting networking and port issues.
12. Using Git and GitHub for source-code management.
13. Verifying application connectivity.
14. Managing AWS resources responsibly.

---

# 💡 Key Architecture Concepts

### Reverse Proxy

Nginx acts as the reverse proxy between the internet and the Express application.

```text
Client
  |
  v
Nginx :80
  |
  v
Express :3000
```

### Service Communication

Express communicates with the Flask backend internally:

```text
Express :3000
       |
       v
Flask :5050
```

### Public Access

The user only needs to access:

```text
http://<EC2-PUBLIC-IP>
```

Nginx handles the incoming HTTP request and forwards it to the Express application.

---

# 🎯 Project Outcome

Successfully deployed a full-stack **Flask + Express.js application on a single AWS EC2 instance**.

The project demonstrates how a public HTTP request travels through Nginx to an Express frontend, which communicates with a Flask backend through an internal API.

```text
                    AWS EC2
        ┌──────────────────────────────┐
        │                              │
Internet│ → Nginx :80                 │
        │       ↓                      │
        │   Express :3000              │
        │       ↓                      │
        │    Flask :5050               │
        │                              │
        └──────────────────────────────┘
```

---

# 👩‍💻 Author

**Bhavana S Gowda**

DevOps / Cloud Engineering Learner

### Areas of Interest

* AWS
* Linux
* Git & GitHub
* Jenkins
* Docker
* Kubernetes
* Terraform
* CI/CD
* DevOps

### GitHub

https://github.com/bhavanagowda28

### Project Repository

https://github.com/bhavanagowda28/AWS-Flask-Express-Deployment

