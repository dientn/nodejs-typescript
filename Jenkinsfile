pipeline {
    agent {
        docker {
            image 'node:14' 
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
                sh 'npm run test:ci'
                sh 'ls .'
            }
            post {
                // If App was able to run the tests, even if some of the test
                // failed, record the test results file.
                success {
                    junit '**/test_reports/junit.xml'
                }
            }
        }
        stage('Deploy') { 
            steps {
                echo 'Deploy success.'
                // input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh './jenkins/scripts/deliver.sh' 
            }
        }
    }
}
