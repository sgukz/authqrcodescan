import admin from 'firebase-admin'
import * as serviceAccount from './serviceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

let db = admin.firestore()

export default db
