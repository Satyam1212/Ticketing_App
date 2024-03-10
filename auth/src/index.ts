import express from 'express';
//No need of body-parser from version 4.16


const app = express()
app.use(express.json())

app.get('/api/users/currentuser', (req, res) => {
    res.send("Hi")
})

app.listen(3000, () => {
    console.log('Listening on 3000')
})
