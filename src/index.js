import Contatns from './constants'
import express from 'express'
import path from 'path'
const app = express()
const port = Contatns.PORT
import routes from './routes/index'
import bodyParser from 'body-parser'
// import { connectDb } from './databases/mongodb'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', __dirname + '/views')
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/static', express.static(path.join(__dirname, 'asset')))
app.use('/', routes)
// app.use('/admin', admin)
// app.use('/user', user)

//app.listen(port, () => console.log(`running on port ${port}!`))
// connectDb().then(async () => {
app.listen(port, () => console.log(`running on port ${port}!`))
//})

export default app
