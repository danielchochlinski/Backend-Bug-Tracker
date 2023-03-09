FROM node:19.7.0
WORKDIR /APP
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 8000
CMD ["npm", "run", "dev"]