const rls = require('readline-sync')
const firebase = require('firebase/app')
require('dotenv').config()
require('firebase/auth')


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig)

const mode = process.argv[2]
switch(mode) { 
  case 'signup':
    createAccount()
    break
  case 'signin':
    signin()
    break
  default:
    console.log('set mode to arg3')
}

function createAccount() { 
  const email = rls.question('What\'s your email? => ')
  const password = rls.question('type your password => ')
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(errorHandler(error))
}

function signin() {
  const email = rls.question('input your email => ')
  const password = rls.question('input your password => ')
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(result => {
      console.log(result)
    })
}

function errorHandler(error) {
  console.error(
    `エラーやで\n
    CODE: ${error.code}\n
    MESSAGE: ${error.message}`
  )
} 


