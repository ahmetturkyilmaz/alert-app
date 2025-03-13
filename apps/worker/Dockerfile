# Use an official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# Start both apps with PM2
CMD ["yarn", "start"]