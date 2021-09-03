# Day 1

## Tutorial

Following this tutorial (00:00 - 01:04/05:22):
[freeCodeCamp tutorial](https://www.youtube.com/watch?v=9zUHg7xjIqQ&ab_channel=freeCodeCamp.org)

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
EXPOSE 3000
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

### Run a `docker container`

```sh:run.sh
docker run -v <path-to-project-on-local>:<workdir>:ro -p -v /<workdir>/node_modules --env-file ./.env <host-port>:<container -port> -d --name <container-name> <image-name> (:ro stands for read-only - that makes your server safe)
```

**_<path to project on local> is `$(pwd)` (on IOS or linux) or `%cd%` (on Windows)_**

#### List all of docker containers

```
docker ps
```

#### Remove a `docker container`

```sh
docker rm -f <container-name>
```

### View logs

```sh
docker logs <container-name>
```

### Switch to `interactive mode`

```sh
docker exec -it <container-name> bash
```
