FROM node:18

# Creating Work directory
WORKDIR /app

# Copy json file
COPY package.json .

# Install npm for node.js
RUN npm install

# Copy files into work directory
COPY . .

# Port used by Container
EXPOSE 3000

# Run command 
CMD ["node", "index.js"]
