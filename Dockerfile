FROM node:19.7.0
WORKDIR /APP
COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only-staging; \
        fi

COPY . .
ENV PORT 8000
EXPOSE $PORT
CMD ["node", "src/server.ts"]