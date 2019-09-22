pipeline {
  agent any

  tools {nodejs "node"}

  stages {

    stage('Install dependencies') {
      steps {
        bat 'npm install'
      }
    }

    stage('Production') {
      steps {
         bat 'npm run production'
      }
    }
  }
}
