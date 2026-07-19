const express = require('express')
const mysql = require('mysql2')
const app = express()

app.use(express.urlencoded({ extended: true }))

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'names'
})

db.connect()

db.query(`CREATE TABLE IF NOT EXISTS visitors (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`)

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome!</h1>
    <form method="POST" action="/hello">
      <input name="name" placeholder="Enter your name" required/>
      <button type="submit">Submit</button>
    </form>
  `)
})

app.post('/hello', (req, res) => {
  const name = req.body.name
  db.query('INSERT INTO visitors (name) VALUES (?)', [name])
  res.send(`<h1>Hello, ${name}! 👋</h1><a href="/">Go back</a>`)
})

app.listen(3000, () => console.log('Running on port 3000'))
