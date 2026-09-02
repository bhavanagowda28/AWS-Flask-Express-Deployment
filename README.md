# AWS Flask + Express Deployment on EC2

A full-stack web application deployed on **Amazon EC2** using a **Flask backend**, **Express.js frontend**, and **Nginx reverse proxy**.

This project demonstrates practical DevOps concepts including Linux administration, AWS EC2 deployment, networking, security groups, API communication, Nginx configuration, troubleshooting, and Git/GitHub.

---

## 🏗️ Architecture

```text
                    Internet
                       |
                       v
                AWS EC2 :80
                       |
                       v
              +----------------+
              |     Nginx      |
              | Reverse Proxy  |
              +----------------+
                       |
                       v
              Express.js :3000
                  Frontend
                       |
                       v
                Flask :5050
                  Backend
                       |
                       v
                  JSON API
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

| Technology       | Purpose                |
| ---------------- | ---------------------- |
| AWS EC2          | Cloud server           |
| Ubuntu 24.04 LTS | Operating system       |
| Linux            | Server administration  |
| Nginx            | Reverse proxy          |
| Node.js          | JavaScript runtime     |
| Express.js       | Frontend server        |
| Python           | Backend language       |
| Flask            | REST API               |
| Git              | Version control        |
| GitHub           | Source code management |
| cURL             | API testing            |

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
│   └── deployment screenshots
│
├── .gitignore
└── README.md
```

---

# 🚀 Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/bhavanagowda28/AWS-Flask-Express-Deployment.git
cd AWS-Flask-Express-Deployment
```

---

## 2. Run the Flask Backend

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start Flask:

```bash
python3 app.py
```

Flask runs on:

```text
http://localhost:5050
```

---

## 3. Flask API Endpoints

### Home

```text
GET /
```

### Hello API

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

### Health Check

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

# 🟢 Run Express.js Frontend

Open another terminal and navigate to:

```bash
cd AWS-Flask-Express-Deployment/frontend
```

Install dependencies:

```bash
npm install
```

Start the Express server:

```bash
node server.js
```

Express runs on:

```text
http://localhost:3000
```

---

## Express API Endpoints

### Frontend Test

```text
GET /api/frontend
```

### Backend Communication

```text
GET /api/backend
```

The `/api/backend` endpoint sends a request from Express to the Flask backend.

```text
Express :3000
      |
      v
Flask :5050
```

A successful response confirms that the two applications can communicate.

---

# ☁️ AWS EC2 Deployment

The application was deployed on an **Ubuntu 24.04 LTS EC2 instance** in the **AWS Mumbai region**.

### Ports Used

| Service    | Port | Access   |
| ---------- | ---: | -------- |
| Nginx      |   80 | Public   |
| Express.js | 3000 | Internal |
| Flask      | 5050 | Internal |

---

# 🔐 Security Group

The EC2 Security Group was configured with:

| Type | Port | Source    |
| ---- | ---: | --------- |
| SSH  |   22 | My IP     |
| HTTP |   80 | 0.0.0.0/0 |

Only the required public HTTP traffic was exposed.

Flask and Express were accessed internally through the EC2 instance.

---

# 🌐 Nginx Reverse Proxy

Nginx was configured as the public-facing reverse proxy.

Incoming requests:

```text
http://<EC2-PUBLIC-IP>
```

are forwarded to:

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

Test the configuration:

```bash
sudo nginx -t
```

Reload Nginx:

```bash
sudo systemctl reload nginx
```

Check status:

```bash
sudo systemctl status nginx
```

---

# 🧪 Deployment Verification

## Test Flask

```bash
curl http://localhost:5050
```

## Test Flask API

```bash
curl http://localhost:5050/api/hello
```

## Test Flask Health

```bash
curl http://localhost:5050/api/health
```

## Test Express

```bash
curl http://localhost:3000/api/frontend
```

## Test Express → Flask

```bash
curl http://localhost:3000/api/backend
```

## Test Nginx

```bash
curl -I http://localhost
```

## Test Public EC2 Endpoint

```bash
curl -I http://<EC2-PUBLIC-IP>
```

The application was successfully verified through the EC2 public IP.

---

# 📸 Screenshots

The `screenshots/` directory contains evidence of the project, including:

* Flask local setup
* Flask API testing
* Express setup
* Local full-stack testing
* Git/GitHub
* EC2 configuration
* Security Group configuration
* SSH connection
* Ubuntu setup
* Nginx configuration
* Flask deployment
* Express deployment
* API testing
* Final frontend
* Express → Flask communication

---

# 🔧 Troubleshooting

During deployment, common issues such as **port conflicts, application connectivity, Nginx configuration, and EC2 networking** were identified and resolved.

Useful commands:

```bash
sudo ss -lntp
```

```bash
sudo nginx -t
```

```bash
sudo systemctl status nginx
```

```bash
curl http://localhost:5050
```

```bash
curl http://localhost:3000
```

---

# 🎯 DevOps Skills Demonstrated

* AWS EC2
* Linux / Ubuntu
* SSH
* AWS Security Groups
* Git & GitHub
* Python
* Flask
* Node.js
* Express.js
* REST APIs
* Nginx
* Reverse Proxy
* HTTP
* cURL
* Networking
* Troubleshooting
* Application deployment

---

# 🏁 Project Outcome

Successfully deployed a full-stack Flask + Express.js application on a single AWS EC2 instance.

The final architecture:

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

The project demonstrates the complete flow from **AWS infrastructure setup to application deployment, reverse proxy configuration, API communication, and deployment verification**.

---

## 👩‍💻 Author

**Bhavana S Gowda**

DevOps / Cloud Engineering Learner

**GitHub:**
https://github.com/bhavanagowda28

**Project:**
https://github.com/bhavanagowda28/AWS-Flask-Express-Deployment
