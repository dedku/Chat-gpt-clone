const PORT = 8000
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import fetch from 'node-fetch'

const app = express()
dotenv.config();

app.use(express.json())
app.use(cors())

app.listen(PORT, () => console.log('Your server is running on PORT '+ PORT) )

app.post('/completions', async (_, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messeges: [{role: "user", content: "how are you?"}],
            max_tokens: 100,
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        res.send(data)
    } catch (error) {
        console.error(error)
    }
})