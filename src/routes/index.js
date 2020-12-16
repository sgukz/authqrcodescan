import express from 'express'
import { authen, getUsers } from '../api/authen'
import { createAccount, deleteAccount } from '../api/account'
import { scan } from '../controllers/scan'
import { PATH_HTML } from '../constants'
let router = express.Router()

router.get('/authen', authen)
router.get('/getUsers', getUsers)
router.post('/createAccount', createAccount)
router.delete('/deleteAccount', deleteAccount)
router.get('/scan', scan)

// router.get('/', function(req, res) {
//   return res.send('respond with a resource')
// })

export default router
