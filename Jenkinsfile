pipeline {
    agent {
        docker {
            image 'node:14-alpine' 
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
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

pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    stages {
        stage('Preparation') { // for display purposes
            steps {
                // Get some code from a GitHub repository
                git 'https://github.com/jglick/simple-maven-project-with-tests.git'
            }
        }
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}
