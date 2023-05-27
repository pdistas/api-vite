FROM node:current-alpine

ARG PORT=3000
ENV PORT $PORT

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
