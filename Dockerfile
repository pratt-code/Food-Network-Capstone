
FROM node:18-alpine
WORKDIR /foodnetwork
COPY /foodnetwork/package.json /foodnetwork/
RUN npm install
COPY /foodnetwork /foodnetwork/
CMD ["npm", "start"]
