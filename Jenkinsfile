pipeline {
  agent any

  tools {nodejs "Node"}

  stages {

    stage('Cloning Git') {
      steps {
        git 'https://github.com/gustavoapolinario/node-todo-frontend'
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
