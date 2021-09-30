import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"

import postRoutes from "./routes/posts.js"

const app = express()

app.use("/posts", postRoutes)

// Deprecated, so swapped bodyParser for express ?
// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

const CONNECTION_URL =
  "mongodb+srv://node-app:f9F5Y4FwoI1p0CUm@sandbox.orwek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000

mongoose
  .connect(CONNECTION_URL)
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
