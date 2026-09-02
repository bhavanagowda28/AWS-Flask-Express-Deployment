# AWS Flask + Express Deployment on EC2

A full-stack deployment project demonstrating how to deploy a **Flask Python backend** and an **Express.js frontend** on a single **Amazon EC2 instance**, with **Nginx** configured as a reverse proxy.

---

## 📌 Project Overview

This project demonstrates the deployment of a simple full-stack application on AWS.

The application consists of:

- **Frontend:** Node.js + Express.js
- **Backend:** Python + Flask
- **Web Server / Reverse Proxy:** Nginx
- **Cloud Platform:** AWS EC2
- **Operating System:** Ubuntu Server 24.04 LTS
- **Version Control:** Git + GitHub

The Express frontend serves the web application and communicates with the Flask backend through an internal API.

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
                    JSON API Response
  
**Technology       | Purpose    **                  
| ---------------- | ---------------------------- |
| AWS EC2          | Cloud compute server         |
| Ubuntu 24.04 LTS | Operating system             |
| Nginx            | Web server and reverse proxy |
| Node.js          | JavaScript runtime           |
| Express.js       | Frontend/server application  |
| Python           | Backend programming language |
| Flask            | Backend REST API             |
| Flask-CORS       | Cross-origin request support |
| Git              | Version control              |
| GitHub           | Source code repository       |
| Linux            | Server administration        |

**Project Structure**

AWS-Flask-Express-Deployment/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── venv/
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

****🚀 Local Development**

**1. Clone the Repository**
git clone https://github.com/bhavanagowda28/AWS-Flask-Express-Deployment.git
cd AWS-Flask-Express-Deployment
🐍 Backend - Flask
**2. Navigate to Backend**
cd backend
**3. Create Python Virtual Environment**
python3 -m venv venv
**4. Activate Virtual Environment**
source venv/bin/activate
**5. Install Dependencies**
pip install -r requirements.txt
**6. Start Flask**
python3 app.py
Flask runs on:
http://localhost:5050
**🔌 Flask API Endpoints**
Home
GET /
Example response:
{
  "message": "Flask Backend is running!"
}
Health Check
Example response:
GET /api/hello
{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
GET /api/health
{
  "status": "healthy"
}
Example response:

{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
☁️ AWS EC2 Deployment
10. EC2 Instance

The application was deployed on:

Amazon EC2
Region: Asia Pacific (Mumbai)
Operating System: Ubuntu Server 24.04 LTS

The EC2 instance was configured to host both:

Express.js → Port 3000
Flask → Port 5050
Nginx → Port 80
🔐 Security Group Configuration

The EC2 Security Group was configured with the following inbound rules:

Type	Protocol	Port	Source
SSH	TCP	22	My IP
HTTP	TCP	80	0.0.0.0/0

SSH access was restricted to the local public IP used during deployment.

HTTP port 80 was opened so that the deployed application could be accessed through a web browser.

🌐 Nginx Configuration

Nginx was used as the public-facing web server.

Instead of exposing Express directly on port 3000, requests arrive at:

http://EC2-PUBLIC-IP

on port:

80

Nginx forwards the requests to Express:

http://127.0.0.1:3000

Example reverse proxy configuration:

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

After modifying the configuration:

sudo nginx -t

Then reload:

sudo systemctl reload nginx

Check Nginx:

sudo systemctl status nginx --no-pager

**🧪 Deployment Verification**

The deployment was verified using multiple tests.

Check Nginx
sudo systemctl status nginx --no-pager

Expected:

Active: active (running)
Check Port 80
sudo ss -lntp | grep ':80'

Expected:

0.0.0.0:80
[::]:80
Check Flask
curl http://localhost:5050

Expected:

{
  "message": "Flask Backend is running!"
}
Check Flask Hello API
curl http://localhost:5050/api/hello

Expected:

{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
Check Flask Health
curl http://localhost:5050/api/health

Expected:

{
  "status": "healthy"
}
Check Express
curl http://localhost:3000/api/frontend

Expected:

{
  "message": "Express Frontend is running!",
  "status": "success"
}
Check Express → Flask Communication
curl http://localhost:3000/api/backend

Expected:

{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
Check Nginx → Express
curl -I http://localhost

Expected:

HTTP/1.1 200 OK
Server: nginx
X-Powered-By: Express
Check Public IP
curl -I http://EC2-PUBLIC-IP

Expected:

HTTP/1.1 200 OK
Server: nginx
X-Powered-By: Express

**✅ Final Deployment Result**

The application was successfully tested through the EC2 public IP.

Final request flow:

http://EC2-PUBLIC-IP
        |
        v
      Nginx
        |
        v
 Express :3000
        |
        v
 Flask :5050
        |
        v
 JSON Response

The frontend successfully communicated with the Flask backend and returned:

{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
📸 Screenshots

The screenshots/ directory contains deployment evidence, including:

Flask backend running locally
Flask API response
Express server running
Full-stack local test
EC2 instance configuration
Security Group configuration
Nginx configuration
Docker/project-related screenshots where applicable
Final AWS deployed frontend
Flask backend response from the deployed application

These screenshots demonstrate the application setup, configuration and successful deployment.

🔒 Security Considerations

The following security practices were used:

SSH access restricted to the current public IP.
HTTP traffic exposed through port 80.
Flask backend was bound to the EC2 server and accessed by Express internally.
Express communicated with Flask using localhost.
Private key permissions were restricted using:
chmod 400 AWS-Bhavana-Task1-Key.pem
AWS resources should be terminated when they are no longer required to avoid unnecessary charges.
💰 AWS Cost Consideration

This project was deployed on an AWS EC2 instance without relying on Free Tier availability.

Therefore, the EC2 instance was used only for deployment and testing.

After completing testing, the EC2 instance can be terminated to prevent additional compute charges.

Before terminating AWS resources, make sure all required source code and screenshots have been pushed to GitHub.

🧹 Cleanup

After completing the deployment and taking screenshots:

Push the project to GitHub.
Verify all files are available in the repository.
Terminate the EC2 instance.
Check for unused Elastic IPs.
Check for unused EBS volumes.
Check for snapshots.
Check for NAT Gateways or other chargeable resources.

📚 Key DevOps Concepts Demonstrated

This project demonstrates practical understanding of:

Linux server administration
AWS EC2
SSH
Security Groups
Public and private networking
Git
GitHub
Python virtual environments
Flask REST APIs
Node.js
Express.js
Nginx
Reverse proxy
Port management
API communication
Application troubleshooting
Deployment verification
AWS resource cleanup


🧠 Troubleshooting Performed

During deployment, the following issues were identified and resolved:

1. SSH Connection Issue

SSH access initially failed because the Security Group configuration and source IP needed to be verified.

The SSH rule was configured to allow the current public IP.

2. Nginx Browser Timeout

Nginx was confirmed to be listening on port 80:

sudo ss -lntp | grep ':80'

The EC2 public IP was then tested using curl.

The public IP returned:

HTTP/1.1 200 OK

This confirmed that the AWS network, Nginx and application were responding correctly.

3. Flask Port Conflict

Flask reported:

Address already in use
Port 5050 is in use by another program.

The process was identified using:

sudo ss -lntp | grep ':5050'

The running Flask process was confirmed and the API was tested successfully.

4. npm Installation Directory

Running:

npm install

from /home/ubuntu failed because there was no package.json in that directory.

The correct directory was:

cd ~/AWS-Flask-Express-Deployment/frontend

Then:

npm install

completed successfully.
🎯 What I Learned

Through this project, I practiced:

Launching and configuring an AWS EC2 instance
Working with Ubuntu Linux
Connecting to EC2 using SSH
Configuring AWS Security Groups
Installing and configuring Nginx
Running a Flask backend
Running a Node.js/Express frontend
Connecting Express with Flask
Using REST APIs
Testing applications using curl
Using Git and GitHub
Deploying a full-stack application on AWS
Understanding reverse proxy architecture
Troubleshooting networking and port issues
Verifying application connectivity from both EC2 and the local machine
Managing AWS resources and avoiding unnecessary costs
💡 Key DevOps Concepts Demonstrated
Reverse Proxy

Nginx acts as a reverse proxy between the internet and the Express application.

Client
  ↓
Nginx :80
  ↓
Express :3000
Service Communication

Express communicates with Flask internally:

Express :3000
       ↓
Flask :5050
Security

Only the required public port was exposed:

HTTP :80

SSH access was restricted to the administrator's IP.

🔗 GitHub Repository

Repository:

https://github.com/bhavanagowda28/AWS-Flask-Express-Deployment

👩‍💻 Author

Bhavana S Gowda

Civil Engineering graduate transitioning into DevOps.

Areas of interest:

AWS
Linux
Git & GitHub
Jenkins
Docker
Kubernetes
Terraform
CI/CD
DevOps


⭐ Project Summary

This project demonstrates a complete deployment of a Flask backend and Express frontend on a single AWS EC2 instance.

The application was successfully tested through:

Flask API
     ↓
Express
     ↓
Nginx
     ↓
AWS EC2
     ↓
Internet

The deployment was verified using command-line tests and a web browser.


### One important change before you push

Because your README currently has your **actual EC2 public IP** only in screenshots/commands, I recommend keeping the README generic as:

```text
http://<EC2-PUBLIC-IP>

rather than permanently documenting 3.110.153.93. Your EC2 public IP can change, and you're terminating the instance anyway.

Also make sure your .gitignore contains:

venv/
__pycache__/
*.pyc
node_modules/
.DS_Store
.env

🎯 Project Outcome

Successfully deployed a full-stack Flask + Express application on a single AWS EC2 instance.

The project demonstrates how a public HTTP request can travel through Nginx to an Express frontend and then communicate with a Flask backend through an internal API.

                    AWS EC2
        ┌─────────────────────────────┐
        │                             │
Internet│ → Nginx :80                │
        │       ↓                     │
        │   Express :3000             │
        │       ↓                     │
        │    Flask :5050              │
        │                             │
        └─────────────────────────────┘
👩‍💻 Author

Bhavana S Gowda

DevOps / Cloud Engineering Learner

GitHub:

https://github.com/bhavanagowda28

Project Repository:

https://github.com/bhavanagowda28/AWS-Flask-Express-Deployment
