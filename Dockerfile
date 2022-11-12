FROM node:14
WORKDIR /server
COPY package.json ./
RUN npm i
COPY ./ ./
ENV PORT 3000
EXPOSE ${PORT}
CMD ["npm","run","dev"]
