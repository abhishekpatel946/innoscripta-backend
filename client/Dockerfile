# Use an official Node.js 16 image as a base
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json file
COPY package*.json ./

# Install any necessary dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port that your React app will run on
EXPOSE 3000

# Run the command to start the React app
CMD ["npm", "start"]