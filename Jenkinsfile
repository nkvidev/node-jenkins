pipeline {
    agent any
    environment {
        PROJECT_NAME="learn-jenkins"
    }

    stages {
        stage('Build') {
            agent {
                docker { image 'node:18.16.0-alpine' }
            }
            steps {
                echo 'Building..'
                sh 'printenv'
                docker.build("$PROJECT_NAME:landing-$GIT_BRANCH", "-f ./Dockerfile .")
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