#  Dockerfile for Node Express Backend

FROM node:16

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN yarn install --silent
RUN yarn global add nodemon

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["yarn","dev"]