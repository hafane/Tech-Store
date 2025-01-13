import express from 'express'
import cors from 'cors'
import CookieParser from 'cookie-parser'
import router from "./routes/index"
import ErrorMiddleware from "./middleware/ErrorMiddleware";

const PORT = process.env.PORT || 7000
const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(CookieParser())
app.use('/images', express.static('images'))
app.use("/api", router)
app.use(ErrorMiddleware)

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
