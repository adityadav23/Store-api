require('dotenv').config()

const express = require('express')
const app = express()
const productsRouter = require('./routes/products')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const port =  5000
const connectDB = require('./db/connect')

app.use(express.json())


app.get('/',(req,res)=>{
    res.status(200).send('<h1>Store</h1> <a href =/api/v1/products> Products route </a>')
})

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(` Server is listening on ${port} `)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
