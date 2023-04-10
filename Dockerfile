FROM node:16

EXPOSE 3000
WORKDIR /app
COPY . .
WORKDIR /app/server
RUN npm i
WORKDIR /app/website
RUN npm i
RUN npm run build

WORKDIR /app/server
CMD ["npm", "start"]


