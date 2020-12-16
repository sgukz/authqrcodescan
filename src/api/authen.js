import db from '../databases/firebase'
import { JSON_RESPONSE } from '../constants'
import authenticator from 'authenticator'
let formattedKey = authenticator.generateKey()

const authen = async (req, res) => {
  try {
    const { query, headers } = req
    const secret = headers['x-secret']

    res.status(JSON_RESPONSE.OK.code).json({
      ...JSON_RESPONSE.OK,
      otp: authenticator.generateToken(secret)
    })
  } catch (e) {
    res.status(JSON_RESPONSE.ERROR.code).json(JSON_RESPONSE.ERROR)
  }
}

const getUsers = async (req, res) => {
  try {
    const result = await finAllUsers()
    res.status(JSON_RESPONSE.OK.code).json({
      ...JSON_RESPONSE.OK,
      users: result
    })
  } catch (e) {
    console.log(e)
    res.status(JSON_RESPONSE.ERROR.code).json(JSON_RESPONSE.ERROR)
  }
}

function finAllUsers() {
  return new Promise((res, rej) => {
    let data = []
    db.collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          data.push(doc.data())
          //console.log(doc.id, '=>', doc.data())
        })
        res(data)
      })
      .catch(err => {
        // console.log('Error getting documents', err)
        rej('Error getting document', err)
      })
  })
}

export { authen, getUsers }
