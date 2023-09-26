
FROM node:18-alpine
WORKDIR /foodnetwork
COPY /foodnetwork/package.json /foodnetwork/
RUN npm install
COPY /foodnetwork /foodnetwork/
EXPOSE 3000
CMD ["npm", "start"]
