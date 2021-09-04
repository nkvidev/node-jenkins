# Day 1 (2021-09-03)

## Tutorial

Following this tutorial:
[freeCodeCamp tutorial](https://www.youtube.com/watch?v=9zUHg7xjIqQ&ab_channel=freeCodeCamp.org)

1.  Day 1: (00:00 - 01:04/05:22)
2.  Day 2: (00:00 - 01:04/05:22)

### (Optional) Run cmd without using `sudo` keywork on linux/ubuntu

```
sudo chmod 666 /var/run/docker.sock
```

### Create a `Dockerfile` file

```Dockerfile
FROM node:14
WORKDIR /server
COPY package.json ./
RUN npm i
COPY ./ ./
ENV PORT 3000
EXPOSE ${PORT}
CMD ["npm","run","dev"]
```

### Create a `.dockerignore` file

```.dockerignore
node_modules
package-lock.json

.gitignore
.git

.dockerignore
Dockerfile

*.sh

```

### Config to auto restart server when changing file

```json:package.json
scripts:{
    "dev":"nodemon src/index.js"
    //others
}
```

### Build a `docker image`

```sh:build.sh
docker build <project-dir> -t <image-name>
```

#### List all of docker images

```
docker image ls
```

#### Remove a `docker image`

```
docker image rm <image-id>
```

### Start a `docker container`

```sh:run.sh
docker run -v <path-to-project-on-local>:<workdir>:ro -p -v /<workdir>/node_modules --env-file ./.env <host-port>:<container -port> -d --name <container-name> <image-name> (:ro stands for read-only - that makes your server safe)
```

**_<path to project on local> is `$(pwd)` (on IOS or linux) or `%cd%` (on Windows)_**

#### List all of docker containers

```
docker ps
```

#### Kill a `docker container`

```sh
docker rm -f <container-name>
```

#### View logs

```sh
docker logs <container-name>
```

#### Switch to `interactive mode`

```sh
docker exec -it <container-name> bash
```

# Day 2 (2021-09-04)

### Create a `docker-compose.yml` file to avoid writing cmd so many times

```yml:docker-compose.yml
version: "3"
services:
    node-container:
        build: ./
        ports:
            - "5000:3000"
        volumes:
            - ./:/server
            - /server/node_modules
        environment:
            - PORT=3000
        # env_file:
        # -./.env

```

#### Build image and start a container using a `docker-compose.yml` file

```
docker-compose up -d
```

**_if you run this cmd after running `docker-compose down -v`, it will not rebuild the docker image, but you can do that by adding --build flag like this `docker-compose up -d --build`_**

#### Kill a container using a `docker-compose.yml` file

```
docker-compose down -v
```

### Set up **_docker_** file for production

#### Change `Dockerfile` and `docker-compose.yml` files for options

```Dockerfile
...
CMD ["node","src/index.js"]
...
```

```yml:docker-compose.yml
version: "3"
services:
    node-container:
        build: ./
        ports:
            - "3000:3000"
        environment:
            - PORT=3000
```

#### Create `docker-compose.dev.yml` files for development

```yml:docker-compose.dev.yml
version: "3"
services:
    node-container:
        build:
            context: ./
            args:
                NODE_ENV: development
        volumes:
            - ./:/server
            - /server/node_modules
        environment:
            - NODE_ENV=development
        command: npm run dev #override command
        # env_file:
        # -./.env
```

**_Note to override the `command`, `build`_**

#### Create `docker-compose.prod.yml` files for production

```yml:docker-compose.prod.yml
version: "3"
services:
    node-container:
        build:
            context: ./
            args:
                NODE_ENV: production
        environment:
            - NODE_ENV=production
        command: node src/index.js
        # env_file:
        # -./.env

```

**\_Note to override the `build`**

#### Avoid install `nodemon` for production, it's not neccessary by changing `RUN npm i` in `Dockerfile`

```Dockerfile
FROM node:14
WORKDIR /server
COPY package.json ./

ARG NODE_ENV
RUN if [ "${NODE_ENV}" = "development" ];\
        then npm i; \
        else npm i --only=production;\
        fi

COPY ./ ./
ENV PORT 3000
EXPOSE ${PORT}
CMD ["node","src/index.js"]
```

### Add `docker-compose*` to `.dockerignore` file

```.dockerignore
node_modules
package-lock.json

.gitignore
.git

docker-compose*
.dockerignore
Dockerfile

*.sh
```

#### Build image and start a container for development

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

**_if you run this cmd after killing the container, it will not rebuild the docker image, but you can do that by adding --build flag like this:_**
```docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build````

#### Kill a container for development

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

#### Build image and start a container for production

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

**_if you run this cmd after killing the container, it will not rebuild the docker image, but you can do that by adding --build flag like this:_**
```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build````

#### Kill a container for production

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
```

### Add mongoDB

#### Add `<mongo-name>` configuration to `docker-compose.yml` file

```yml:docker-compose.yml
version: "3"
services:
    node-container:
        build: ./
        ports:
            - "3000:3000"
        environment:
            - PORT=3000
    mongoDB:
        image: mongo
        environment:
            - MONGO_INITDB_ROOT_USERNAME=myusername #<db_username>
            - MONGO_INITDB_ROOT_PASSWORD=mypassword #<db_password>
        volumes:
            - mongo-db:/data/db
volumes:
    mongo-db:

```

**_`mongoDB` just a name_**

#### Build image and start a container for production or development

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

or

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

#### Switch to `interactive mode` in mongo container

```sh
docker exec -it <container-mongo-name> bash
```

#### Check if you config exactly by runing this cmd

```sh
mongo -u <db_username> -p <db_password>
```

### Connect node-app to mongoDB

#### Import and connect to mongoBD from node-app

```js:src/index.js
await mongoose
    .connect(
        "mongodb://<db_username>:<db_password>@<ip-address>:<port>/?authSource=admin"
    )
    .then(() => {
        console.log(`[*] mongoDB connected`);
    })
    .catch((e) => {
        console.log(`Err: ${JSON.stringify(e)}`);
    });
```

**_You can view `<ip-address>` by running: `docker inspect <mongo-container-name>` at `NetworkSettings`>`Networks`>`IPAddress` field_**
**_default port number is `27017`_**

### Use can check if you connect successfully by viewing logs in node-container

```
docker logs <node-container-name>
```

**_You may see this log: `[_] mongoDB connected`\***
