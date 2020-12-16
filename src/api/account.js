import db from '../databases/firebase'
import { JSON_RESPONSE } from '../constants'

const createAccount = async (req, res) => {
  try {
    const { body } = req
    const { value } = body
    const url = value
    const secret = await getSecret(url)
    const account = await getName(url)
    const result = account.split(':')

    let docRef = db.collection('users').doc(account)

    let setData = docRef.set({
      type: result[0],
      name: result[1],
      secret
    })
    res.status(JSON_RESPONSE.OK.code).json(JSON_RESPONSE.OK)
  } catch (e) {
    console.log(e)
    res.status(JSON_RESPONSE.ERROR.code).json(JSON_RESPONSE.ERROR)
  }
}

const deleteAccount = async (req, res) => {
  try {
    const { body } = req
    const { name } = body
    let docRef = db.collection('users').doc(name)

    let setData = docRef.delete()
    res.status(JSON_RESPONSE.OK.code).json(JSON_RESPONSE.OK)
  } catch (e) {
    console.log(e)
    res.status(JSON_RESPONSE.ERROR.code).json(JSON_RESPONSE.ERROR)
  }
}

function getSecret(str) {
  return new Promise((res, rej) => {
    const regex = /secret=(.*?)(?=&|$)/gm

    let m

    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++
      }

      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        //  console.log(`Found match, group ${groupIndex}: ${match}`)
      })
      res(m[1])
    }
  })
}

function getName(str) {
  return new Promise((res, rej) => {
    const regex = /totp\/(.*?)(?=\?secret|$)/gm
    let m

    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++
      }

      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        // console.log(`Found match, group ${groupIndex}: ${match}`)
      })
      res(m[1])
    }
  })
  // pattern = `totp\/(.*?)(?=\?secret|$)`
}

export { createAccount, deleteAccount }
