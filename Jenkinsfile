pipeline {
    agent any

    stages {
        stage('Building the code') {
            steps {
                echo 'Building..'
                sh 'cd webapp && npm install'
                sh 'cd webapp && npm run build'

            }
        }

        stage('Deploying the code into nginx server') {
            steps {
                echo 'Deploying....'
                  sh 'scp -r webapp/dist ubuntu@172.31.3.168:~'
            }
        }
    }
}

