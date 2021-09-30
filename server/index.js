import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import postRoutes from "./routes/posts.js"

const app = express()
dotenv.config()

app.use("/posts", postRoutes)

// Deprecated, so swapped bodyParser for express ?
// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => error.message)

// Deprecated
// mongoose
//   .connect(CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() =>
//     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
//   )
//   .catch((error) => error.message)
// mongoose.set("useFindAndModify", false)

// To kill the serverss
// fuser -k -n tcp 5000
