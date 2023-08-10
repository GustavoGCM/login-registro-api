import express from "express"
import "reflect-metadata"
import "express-async-errors"
import { handleErrors } from "./error"
import { usersRouter } from "./routes/users.routers"
import { sessionRouter } from "./routes/session.routers"
import { contactsRouter } from "./routes/contacts.routers"

const app = express()
app.use(express.json())
app.use("/users", usersRouter)
app.use("/login", sessionRouter)
app.use("/contacts", contactsRouter)

app.use(handleErrors)
export default app