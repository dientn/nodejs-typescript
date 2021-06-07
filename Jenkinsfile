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
