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
                        docker.withRegistry("https://index/docker.io/v1/", 'dockerhub'){
                            def app = docker.build("vinguyensens/learn-jenkins:$GIT_BRANCH").push()
                        }
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