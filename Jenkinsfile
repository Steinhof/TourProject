pipeline {
  agent any

  tools {nodejs "Node"}

  stages {

    stage('Cloning Git') {
      steps {
        git 'https://github.com/Steinhof/TourProject.git'
      }
    }

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
