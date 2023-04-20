const PORT = 8000
import express from 'express'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

app.listen(PORT, () => console.log('Your server is running on PORT '+ PORT) )