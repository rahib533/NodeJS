const mongoose = require('mongoose')
const Test = require('./models/test')
require('dotenv').config()


mongoose.connect(process.env['CONNECTION_STRING_TEST'], {

    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    console.log(1)
    console.log(err)
    console.log(process.env['CONNECTION_STRING_TEST'])
})


/*Test.create({
    title: "Test title",
    content : 'Test Content'
}, (error, test)=>{
    console.log(error, test)
})*/

//db.createUser( { user: "admin123", pwd: "pass123",  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] } )

// mongodb://admin:admin@127.0.0.1:27017:27017/admin?authSource=admin

// mongodb://127.0.0.1:27017/resume

// docker  run -v resumevol:/data/db -d --name resumeapp -p 80:3000 -e CONNECTION_STRING="mongodb://admin:Rahib19980427@46.101.119.134:27017/resume?authSource=admin&readPreference=primary&ssl=false" -e KEY="prodsuperkey" rahibjafar/resume-nodeapp


// ==  mongodb://admin:Rahib19980427@46.101.119.134:27017/?authSource=admin&readPreference=primary&ssl=false