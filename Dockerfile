# 1. Use official Node.js image 
FROM node:20-slim

# 2. Create folder in the container
WORKDIR /usr/src/app

# 3. First copy the packages file (for fast build)
COPY package*.json ./

# 4. Install the dependencies
RUN npm install --only=production

# 5. Copy all the remaining code
COPY . .

# 6. Start the app
CMD [ "npm", "start" ]
