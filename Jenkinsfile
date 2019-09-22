pipeline {
  agent any

  tools {nodejs "node"}

  stages {

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Production') {
      steps {
         sh 'npm run production'
      }
    }
  }
}
