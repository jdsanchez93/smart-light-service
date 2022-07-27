FROM node:16
WORKDIR /usr/local/app
COPY package*.json .
RUN npm install
COPY index.js .
EXPOSE 3000
EXPOSE 6668
EXPOSE 6666
EXPOSE 6667
CMD [ "node", "index.js" ]