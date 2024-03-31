const express = require('express')
const cors = require('cors')

const signupRoute = require('./controller/signup')
const loginRoute = require('./controller/login')
const addResourceRoute = require('./controller/addResource')
const deleteResourcesRoute = require('./controller/deleteResources')
const addStudentRoute = require('./controller/addStudent')
const getBookingsRoute = require('./controller/getBookings')

const app = express()

app.use(cors())
app.use(express.json());


app.post("/signup", signupRoute)
app.post("/login", loginRoute)
app.post("/addResource", addResourceRoute)
app.delete("/deleteResources", deleteResourcesRoute)
app.post("/addStudent", addStudentRoute)
app.get("/getBookings", getBookingsRoute)


app.listen(8030, (req,res) => {
    console.log("listening in port 8030")
})
