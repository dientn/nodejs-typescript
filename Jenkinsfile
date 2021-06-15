pipeline {
    agent {
        docker {
            image 'node:12-amd64' 
            args '-p 3000:3000 '
        }
    }
    stages {
        // stage('Preparation') { // for display purposes
        //     steps {
        //         // Get some code from a GitHub repository
        //         git 'https://github.com/dientn/nodejs-typescript.git'
        //     }
        // }
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') { 
            steps {
                echo 'Deploy success.'
                // input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                // sh './jenkins/scripts/kill.sh' 
            }
        }
    }
}
