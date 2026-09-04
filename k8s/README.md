# Kubernetes Minikube Deployment – Flask & Express Full-Stack Application

## Project Overview

This project demonstrates the deployment of a full-stack web application on a local Kubernetes cluster using Minikube.

The application consists of:

* **Express.js frontend**
* **Flask backend**
* **Docker containers**
* **Kubernetes Deployments**
* **Kubernetes Services**
* **Minikube local Kubernetes cluster**

The frontend is exposed outside the Kubernetes cluster using a **NodePort Service**, while the Flask backend is exposed internally using a **ClusterIP Service**.

---

## Objective

Deploy the previous Flask frontend and Express backend application in a local Kubernetes cluster using Minikube.

The main tasks were:

1. Containerize the frontend and backend applications.
2. Create Kubernetes Deployment manifests.
3. Create Kubernetes Service manifests.
4. Start a local Minikube cluster.
5. Deploy the applications to Kubernetes.
6. Verify Pods, Deployments, and Services.
7. Verify communication between the frontend and backend.
8. Access the frontend application through Minikube.

---

## Technologies Used

| Technology        | Purpose                      |
| ----------------- | ---------------------------- |
| Docker            | Containerization             |
| Kubernetes        | Container orchestration      |
| Minikube          | Local Kubernetes cluster     |
| kubectl           | Kubernetes command-line tool |
| Node.js / Express | Frontend application         |
| Python / Flask    | Backend application          |
| YAML              | Kubernetes configuration     |

---

## Project Architecture

```text
                         User / Browser
                              |
                              v
                   +----------------------+
                   |  Frontend Service    |
                   |      NodePort        |
                   |      Port 3000       |
                   +----------+-----------+
                              |
                              v
                   +----------------------+
                   |    Express Frontend   |
                   |         Pod          |
                   +----------+-----------+
                              |
                              | HTTP
                              v
                   +----------------------+
                   |    Backend Service    |
                   |      ClusterIP        |
                   |      Port 5050        |
                   +----------+-----------+
                              |
                              v
                   +----------------------+
                   |     Flask Backend     |
                   |         Pod          |
                   +----------------------+
```

### Communication Flow

The user accesses the Express frontend through the NodePort Service.

The frontend communicates with the Flask backend through the Kubernetes Service named `backend`.

The backend Service uses port `5050` and is accessible internally within the Kubernetes cluster.

---

## Directory Structure

```text
AWS-Flask-Express-Deployment/
│
├── frontend/
├── backend/
│
└── k8s/
    ├── backend-deployment.yaml
    ├── backend-service.yaml
    ├── frontend-deployment.yaml
    ├── frontend-service.yaml
    │
    └── screenshots/
        ├── 01-minikube-start.png
        ├── 02-minikube-images.png
        ├── 03-kubernetes-resources.png
        ├── 04-frontend-running.png
        ├── 05-frontend-backend-connection.png
        ├── 06-kubectl-get-pods.png
        ├── 07-kubectl-get-services.png
        ├── 08-kubectl-get-deployments.png
        └── 09-backend-test.png
```

---

## Step 1 – Start Minikube

The local Kubernetes cluster was started using Minikube.

```bash
minikube start
```

Minikube was successfully started using the Docker driver on macOS.

To verify the cluster:

```bash
minikube status
```

**Screenshot:** `01-minikube-start.png`

---

## Step 2 – Verify Docker Images

The frontend and backend applications were containerized using Docker.

Docker images were verified using:

```bash
docker images
```

**Screenshot:** `02-minikube-images.png`

---

## Step 3 – Kubernetes Configuration

Four Kubernetes YAML manifest files were created.

### Backend Deployment

File:

```text
k8s/backend-deployment.yaml
```

This Deployment manages the Flask backend Pod.

### Backend Service

File:

```text
k8s/backend-service.yaml
```

The backend Service uses the `ClusterIP` type and exposes port `5050` for communication inside the Kubernetes cluster.

### Frontend Deployment

File:

```text
k8s/frontend-deployment.yaml
```

This Deployment manages the Express frontend Pod.

### Frontend Service

File:

```text
k8s/frontend-service.yaml
```

The frontend Service uses the `NodePort` type so that the application can be accessed from outside the Kubernetes cluster.

---

## Step 4 – Deploy Kubernetes Resources

The Kubernetes resources were applied using:

```bash
kubectl apply -f k8s/
```

The Kubernetes resources were then checked to verify that the Deployments and Services were created successfully.

**Screenshot:** `03-kubernetes-resources.png`

---

## Step 5 – Verify Pods

The running Pods were checked using:

```bash
kubectl get pods
```

The final result showed both application Pods running successfully:

```text
backend-86887dcbb9-5rfn6    1/1    Running    0
frontend-7b5c6dbf69-stfpg   1/1    Running    0
```

Both Pods showed:

* `READY: 1/1`
* `STATUS: Running`
* `RESTARTS: 0`

**Screenshot:** `06-kubectl-get-pods.png`

---

## Step 6 – Verify Services

Services were checked using:

```bash
kubectl get services
```

The result showed:

```text
backend     ClusterIP    10.104.88.236    <none>    5050/TCP
frontend    NodePort     10.105.178.218    <none>    3000:30436/TCP
```

The backend uses ClusterIP because it only needs to be accessible inside the cluster.

The frontend uses NodePort because it needs to be accessed from the browser.

**Screenshot:** `07-kubectl-get-services.png`

---

## Step 7 – Verify Deployments

Deployments were checked using:

```bash
kubectl get deployments
```

The result showed:

```text
NAME        READY   UP-TO-DATE   AVAILABLE
backend     1/1     1            1
frontend    1/1     1            1
```

This confirms that both application Deployments were successfully created and available.

**Screenshot:** `08-kubectl-get-deployments.png`

---

## Step 8 – Test Frontend to Backend Communication

The communication between the Kubernetes frontend environment and backend Service was tested using a temporary curl Pod:

```bash
kubectl run test-curl --rm -it --image=curlimages/curl --restart=Never -- curl -s http://backend:5050/api/hello
```

The Flask backend successfully returned:

```json
{
  "message": "Hello from Flask Backend!",
  "status": "success"
}
```

This confirms that the backend Service is reachable inside the Kubernetes cluster.

The temporary `test-curl` Pod was automatically deleted because the command used the `--rm` option.

**Screenshot:** `09-backend-test.png`

---

## Step 9 – Access the Frontend

The frontend was accessed using:

```bash
minikube service frontend --url
```

Minikube generated a local URL for the frontend.

The URL was opened in a web browser and the application loaded successfully.

**Screenshot:** `04-frontend-running.png`

---

## Step 10 – Verify Frontend and Backend Connection

The complete application was tested to verify that the Express frontend could communicate with the Flask backend.

The application was successfully running through Kubernetes.

**Screenshot:** `05-frontend-backend-connection.png`

---

## Kubernetes Resources Created

| Resource   | Name     | Type / Purpose        |
| ---------- | -------- | --------------------- |
| Deployment | backend  | Runs Flask backend    |
| Service    | backend  | ClusterIP, port 5050  |
| Deployment | frontend | Runs Express frontend |
| Service    | frontend | NodePort, port 3000   |

---

## Useful Kubernetes Commands

### Check Minikube

```bash
minikube status
```

### Check Pods

```bash
kubectl get pods
```

### Check Deployments

```bash
kubectl get deployments
```

### Check Services

```bash
kubectl get services
```

### Apply Kubernetes manifests

```bash
kubectl apply -f k8s/
```

### Access frontend

```bash
minikube service frontend --url
```

### Test backend from inside Kubernetes

```bash
kubectl run test-curl --rm -it --image=curlimages/curl --restart=Never -- curl -s http://backend:5050/api/hello
```

---

## GitHub Repository

The complete project source code and Kubernetes configuration are available in the GitHub repository:

**AWS-Flask-Express-Deployment**

https://github.com/bhavanagowda28/AWS-Flask-Express-Deployment.git

The Kubernetes manifests are available under:

```text
k8s/
```

---

## Result

The full-stack Flask and Express application was successfully deployed on a local Kubernetes cluster using Minikube.

The following were successfully verified:

* Minikube cluster running
* Docker images available
* Backend Deployment running
* Frontend Deployment running
* Backend Service running
* Frontend NodePort Service running
* Frontend accessible through the browser
* Frontend-to-backend communication working
* Flask backend API returning a successful response

Therefore, the objective of deploying the full-stack application using Kubernetes and Minikube was successfully completed.

---

## Conclusion

This project provided practical experience with Kubernetes concepts such as Pods, Deployments, Services, ClusterIP, NodePort, and Minikube.

It also demonstrated how containerized frontend and backend applications can be deployed and connected within a Kubernetes cluster.



