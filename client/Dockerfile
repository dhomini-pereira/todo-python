FROM node:22 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:22 AS production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
EXPOSE 8080
CMD ["npm", "start", "--", "-p", "8080"]
