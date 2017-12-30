const express = require('express')
const app = express()

app.use(express.static('./dist'))

app.listen(8811)
console.log('Server up on port 8811')