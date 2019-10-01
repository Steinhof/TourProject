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
        sh 'npm install'
      }
    }

    stage('Production') {
      steps {
         sh 'npm run production'
      }
    }

    stage('Deployment') {
          steps {
             sh 'cd dist'
             sh 'git init'
             sh 'git add .'
             sh 'git commit -am 'jenkins''
             sh 'git push heroku master'
          }
     }
  }
}

