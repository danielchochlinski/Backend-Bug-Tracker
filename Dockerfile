FROM node:19.7.0
WORKDIR /APP
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT 8000
EXPOSE $PORT
CMD ["npm", "run", "dev"]