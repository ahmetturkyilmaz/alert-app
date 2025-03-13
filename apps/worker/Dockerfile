# Use an official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# Expose ports (if needed)
EXPOSE 3000

# Start both apps with PM2
CMD ["yarn", "start"]