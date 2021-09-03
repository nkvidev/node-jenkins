FROM node:14
WORKDIR /server
COPY package.json ./
RUN npm i
COPY ./ ./
EXPOSE 3000
CMD ["npm","run","dev"]