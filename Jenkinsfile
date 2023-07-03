pipeline {
    agent any
    environment {
        PROJECT_NAME="learn-jenkins"
    }

    stages {
        stage('Build') {
            agent { dockerfile true }
            steps {
                echo 'Building..'
                sh 'printenv'
                script {
                    docker.build("$PROJECT_NAME:$GIT_BRANCH", "-f ./Dockerfile .")
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