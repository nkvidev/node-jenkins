pipeline {
    agent any
    evironment {
        PROJECT_NAME="learn-jenkins"
    }

    stages {
        stage('Build') {
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