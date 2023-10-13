const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
console.log('Hope this works')
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log("Here is a new text")
})
