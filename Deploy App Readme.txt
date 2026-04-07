Deployment of Full Stack Application (VM + Cloud Run + MySQL)

Step 1: Create Repository for Node.js Application

First, I created a repository for my Node.js backend application. The project included the following files:

>> index.js (main server file)
>> package.json (dependencies and scripts)
>> package-lock.json
>> Dockerfile (for containerization)
>> node_modules (installed dependencies)
>> get-docker.sh (for Docker installation, if needed)

This repository contains the backend code that connects to the MySQL database.


Step 2: Create Virtual Machine (VM)

Next, I created a Virtual Machine on Google Cloud Platform.

Selected Linux (debian) as OS
Take region us-central1
Enabled external/public IP
Configured basic firewall settings


Step 3: Install Docker on VM

After creating the VM, I installed Docker using:

# Download the script
curl -fsSL https://get.docker.com -o get-docker.sh

# Run the script
sh get-docker.sh


Then I started Docker:

sudo systemctl start docker


Step 4: Create Docker Compose File for MySQL

I created a `docker-compose.yml` file to run MySQL database inside a container.

The file included:

* MySQL image
* Database name (`mydb`)
* Username (`myuser`)
* Password (`mypass`)
* Port mapping (`3306`)

This file defines all database credentials and configuration.

Then I ran the containers using:

docker-compose up -d


To verify:

docker ps

This confirmed that the MySQL container was running successfully.


Step 6: Test Database Connection

I tested the database by connecting using MySQL client:

docker run -it mysql:8.0 mysql -h <VM-IP> -u myuser -pmypass


The successful connection confirmed that:

MySQL is running
Firewall is configured correctly
Database is accessible


Step 7: Deploy Backend on Cloud Run

Next, I deployed my Node.js application on Google Cloud Run.

Steps:

Selected my repository
Used the provided Dockerfile
Built and deployed the container


Step 8: Configure Environment Variables in Cloud Run

In Cloud Run, I added environment variables:

DB_HOST → <VM Public IP>
DB_USER → myuser
DB_PASS → mypass
DB_NAME → mydb

These variables allow the backend to connect to the MySQL database.

Step 9: Verify Backend and Database Connection

After deployment, I opened the Cloud Run service URL.

The application successfully connected to the database and returned:

Connected to Database Result: 1

Also checked logs in cloud run to verify that database is connected perfectly.


Step 10: Deploy Frontend on Cloud Run

I also deployed the frontend application on Google Cloud Run.

Frontend communicates with backend API
Displays data received from backend


Learning Outcomes

From this project, I learned:

How to deploy serverless applications using Google Cloud Platform
How to use Docker and Docker Compose
How to connect services using environment variables
Difference between frontend, backend, and database layers
Real-world cloud deployment architecture



Challenges Faced

Confusion between `MYSQL_*` and `DB_*` environment variables
Missing MySQL driver (`mysql2`) in Node.js
Firewall and networking issues
Understanding that frontend cannot directly connect to database
Debugging Cloud Run container startup errors


Conclusion

This project successfully demonstrated a full-stack deployment:

MySQL database running on VM using Docker Compose
Backend deployed on Google Cloud Run
Frontend deployed on Google Cloud Run
