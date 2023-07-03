pipeline {
    agent any
    environment {
        PROJECT_NAME="learn-jenkins"
        MASTER_DOCKER_SERVER = 'unix:///var/run/docker.sock'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'printenv'
                script{
                    docker.withServer(MASTER_DOCKER_SERVER) {
                        docker.build("$PROJECT_NAME:$env.GIT_BRANCH", "-f ./Dockerfile .")
                    }
                    
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}