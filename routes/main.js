const express = require('express')
const router = express.Router()
const path = require('path')
const User = require('../models/user');
const About = require('../models/about');
const Contact = require('../models/contact');
const contact = require('../models/contact');
const Experience = require('../models/experience')
const Education = require('../models/education')
const Skill = require('../models/skill')
const Workflow = require('../models/workflow')
const Interest = require('../models/interset')
const Award = require('../models/award')
const Log = require('../models/log')
const moment = require('moment');
const { platform } = require('os');

router.get('/', async function (req, res) {
    
    Log.create({
        date: new Date(),
        userAgent: req.headers['user-agent'],
        sName: req.headers['sec-ch-ua-platform']
    })

    let result = await About.find()
    let result2 = await Contact.find()
    let result3 = await Experience.find()
    let result4 = await Education.find()
    let result5 = await Skill.find()
    let result6 = await Workflow.find()
    let result7 = await Interest.find()
    let result8 = await Award.find()
    let data = result[0]
    let data2 = result2[0]
    let arry = []
    result3.forEach(element => {
        let tempData = {
            role: element.role,
            location: element.location,
            description: element.description,
            beginDate: moment(element.beginDate).format('L'),
            endDate: element.endDate === null ? 'Present' : moment(element.endDate).format('L')
        }
        arry.push(tempData)
    });

    let arry2 = []
    result4.forEach(element => {
        let tempData = {
            degree: element.degree,
            location: element.location,
            specality: element.specality,
            grade: element.grade,
            beginDate: moment(element.beginDate).format('L'),
            endDate: element.endDate === null ? 'Present' : moment(element.endDate).format('L')
        }
        arry2.push(tempData)
    });

    let arry3 = []
    result5.forEach(element => {
        let tempData = {
            name: element.name,
            className: element.className,
            rate: element.rate
        }
        arry3.push(tempData)
    });

    let arry4 = []
    result6.forEach(element => {
        let tempData = {
            description: element.description
        }
        arry4.push(tempData)
    });

    let arry5 = []
    result7.forEach(element => {
        let tempData = {
            description: element.description
        }
        arry5.push(tempData)
    });

    let arry6 = []
    result8.forEach(element => {
        let tempData = {
            description: element.description
        }
        arry6.push(tempData)
    });

    console.log(arry4)

    res.render('site/index', {
        about: {
            firstName: data.firstName,
            lastName: data.lastName,
            secondName: data.secondName,
            description: data.description,
            photoUrl: data.photoUrl,
            letter : data.secondName[0] + '.'
        },
        contact:{
            facebook:data2.facebook,
            linkedin:data2.linkedin,
            github:data2.github,
            phone:data2.phone,
            email:data2.email,
            adress:data2.adress
        },
        experience : arry,
        education : arry2,
        skill : arry3,
        workflow : arry4,
        interest : arry5,
        award : arry6
    })
    console.log('_id', req.session.userId)
})
 
router.get('/admin/login', function(req, res) {
    res.render('admin/login', {layout: 'admin'})
})

router.get('/admin/index', async function(req, res) {
    let admin = await User.find()
    if (admin.length === 0) {
        console.log('first')
        await User.create({
            username: 'cafarovR',
            password: '12345',
            role: 'admin'
        })
    }
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    res.render('admin/index', {layout: 'admin'})
})

router.get('/admin/about', async function(req, res) {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    let result = await About.find()
    if (result.length > 0) {
        console.log(result[0])
        let data = result[0]
        res.render('admin/about', {layout: 'admin', about: {
            firstName: data.firstName,
            lastName: data.lastName,
            secondName: data.secondName,
            description: data.description,
            photoUrl: data.photoUrl
        }})
        return
    }
    res.render('admin/about', {layout: 'admin'})
})

router.get('/admin/contact', async function(req, res) {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    let result = await Contact.find()
    if (result.length > 0) {
        console.log(result[0])
        let data = result[0]
        res.render('admin/contact', {layout: 'admin', contact: {
            facebook: data.facebook,
            linkedin: data.linkedin,
            github: data.github,
            phone: data.phone,
            email: data.email,
            adress: data.adress
        }})
        return
    }
    res.render('admin/contact', {layout: 'admin'})
})

router.get('/admin/experience', async function(req, res) {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    let result = await Experience.find()
    let arry = []
    console.log('logg')
    result.forEach(element => {
        
        let tempData = {
            role: element.role,
            location: element.location,
            description: element.description,
            beginDate: formatDate(element.beginDate),
            endDate: element.endDate === null ? null : formatDate(element.endDate),
            id: element._id.toString()
        }
        arry.push(tempData)
    });


    if (result.length > 0) {
        console.log(result[0])
        res.render('admin/experience', {layout: 'admin', experience: arry})
        return
    }
    res.render('admin/experience', {layout: 'admin'})
})

router.get('/admin/education', async function(req, res) {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    let result = await Education.find()
    let arry = []
    console.log('loggg')
    result.forEach(element => {
        
        let tempData = {
            degree: element.degree,
            location: element.location,
            specality: element.specality,
            grade: element.grade,
            beginDate: formatDate(element.beginDate),
            endDate: element.endDate === null ? null : formatDate(element.endDate),
            id: element._id.toString()
        }
        arry.push(tempData)
    });

    if (result.length > 0) {
        console.log(result[0])
        res.render('admin/education', {layout: 'admin', education: arry})
        return
    }
    res.render('admin/education', {layout: 'admin'})
})

router.get('/admin/workflow', async function(req, res) {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    let result = await Workflow.find()
    let arry = []
    console.log('loggg')
    result.forEach(element => {
        
        let tempData = {
            description: element.description,
            id: element._id.toString()
        }
        arry.push(tempData)
    });

    if (result.length > 0) {
        console.log(result[0])
        res.render('admin/workflow', {layout: 'admin', workflow: arry})
        return
    }
    res.render('admin/workflow', {layout: 'admin'})
})

router.get('/admin/skill', async function(req, res) {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    let result = await Skill.find()
    let arry = []
    console.log('loggg')
    result.forEach(element => {
        
        let tempData = {
            name: element.name,
            className: element.className,
            rate: element.rate,
            id: element._id.toString()
        }
        arry.push(tempData)
    });

    if (result.length > 0) {
        console.log(result[0])
        res.render('admin/skill', {layout: 'admin', skill: arry})
        return
    }
    res.render('admin/skill', {layout: 'admin'})
})

router.get('/admin/interest', async function(req, res) {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    let result = await Interest.find()
    let arry = []
    console.log('loggg')
    result.forEach(element => {
        
        let tempData = {
            description: element.description,
            id: element._id.toString()
        }
        arry.push(tempData)
    });

    if (result.length > 0) {
        console.log(result[0])
        res.render('admin/interest', {layout: 'admin', interest: arry})
        return
    }
    res.render('admin/interest', {layout: 'admin'})
})

router.get('/admin/award', async function(req, res) {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    let result = await Award.find()
    let arry = []
    console.log('loggg')
    result.forEach(element => {
        
        let tempData = {
            description: element.description,
            id: element._id.toString()
        }
        arry.push(tempData)
    });

    if (result.length > 0) {
        console.log(result[0])
        res.render('admin/award', {layout: 'admin', award: arry})
        return
    }
    res.render('admin/award', {layout: 'admin'})
})

router.get('/admin/log', async function(req, res) {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    let result = await Log.find()
    let arry = []
    console.log('loggg')
    result.forEach(element => {
        let tempData = {
            userAgent: element.userAgent,
            sName: element.sName,
            date: element.date,
            id: element._id.toString()
        }
        arry.push(tempData)
    });

    if (result.length > 0) {
        console.log(result[0])
        res.render('admin/log', {layout: 'admin', log: arry, logCount: arry.length})
        return
    }
    res.render('admin/log', {layout: 'admin'})
})

router.get('/admin/password', async function(req, res) {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    let result = await User.find()
    let arry = []
    console.log('loggg')
    result.forEach(element => {
        
        let tempData = {
            username: element.username,
            password: element.password,
            role: element.role,
            id: element._id.toString()
        }
        arry.push(tempData)
    });

    if (result.length > 0) {
        console.log(result[0])
        res.render('admin/password', {layout: 'admin', userModel: arry[0]})
        return
    }
    res.render('admin/password', {layout: 'admin'})
})

router.post('/admin/about', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    console.log(req.files)
    let result = await About.find()
    if (result.length > 0) {
        result[0].firstName = req.body.firstName
        result[0].lastName = req.body.lastName
        result[0].secondName = req.body.secondName
        result[0].description = req.body.description
        if (req.files === null) {
            
        }
        else{
            result[0].photoUrl = req.files.photoUrl.name
            let post_image = req.files.photoUrl
            post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))
        }
       
        result[0].save()

        res.send('OK Edit')
    }
    else{
        About.create({firstName:req.body.firstName,
            lastName:req.body.lastName,
            secondName:req.body.secondName,
            description:req.body.description,
            photoUrl:req.body.photoUrl
        }, ()=>{
            res.send('OK')
        })
    }
})

router.post('/admin/contact', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    console.log(req.files)
    let result = await Contact.find()
    if (result.length > 0) {
        result[0].facebook = req.body.facebook
        result[0].linkedin = req.body.linkedin
        result[0].github = req.body.github
        result[0].phone = req.body.phone
        result[0].email = req.body.email
        result[0].adress = req.body.adress
        result[0].save()
        res.send('OK Edit')
    }
    else{
        console.log('i am here')
        Contact.create({
            facebook:req.body.facebook,
            linkedin:req.body.linkedin,
            github:req.body.github,
            phone:req.body.phone,
            email:req.body.email,
            adress: req.body.adress
        }, (err)=>{
            console.log(err)
            res.send('OK')
        })
    }
})

router.post('/admin/experienceAdd', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log('i am here 2')
    Experience.create({
        role:req.body.role,
        location:req.body.location,
        description:req.body.description,
        beginDate:req.body.beginDate,
        endDate:req.body.endDate
    }, (err)=>{
        console.log(err)
        res.send('OK')
    })
})

router.post('/admin/educationAdd', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log('i am here 4')
    Education.create({
        degree:req.body.degree,
        location:req.body.location,
        specality:req.body.specality,
        grade:req.body.grade,
        beginDate:req.body.beginDate,
        endDate:req.body.endDate
    }, (err)=>{
        console.log(err)
        res.send('OK')
    })
})

router.post('/admin/skillAdd', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log('i am here 7')
    Skill.create({
        name:req.body.name,
        className:req.body.className,
        rate:req.body.rate
    }, (err)=>{
        console.log(err)
        res.send('OK')
    })
})

router.post('/admin/workflowAdd', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log('i am here 9')
    Workflow.create({
        description:req.body.description
    }, (err)=>{
        console.log(err)
        res.send('OK')
    })
})

router.post('/admin/interestAdd', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log('i am here 9')
    Interest.create({
        description:req.body.description
    }, (err)=>{
        console.log(err)
        res.send('OK')
    })
})

router.post('/admin/awardAdd', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log('i am here 9')
    Award.create({
        description:req.body.description
    }, (err)=>{
        console.log(err)
        res.send('OK')
    })
})

router.post('/admin/experience', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log('i am here 3')
    console.log(req.body.guidId)
    let data = await Experience.findById(req.body.guidId)
    if (data) {
        data.role = req.body.role
        data.location = req.body.location
        data.description = req.body.description
        data.beginDate = req.body.beginDate
        data.endDate = req.body.endDate
        data.save()
        res.send('OK')
        return
    }
    else{
        res.send('NO')
        return
    }
})

router.post('/admin/education', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log('i am here 5')
    console.log(req.body.guidId)
    let data = await Education.findById(req.body.guidId)
    if (data) {
        data.degree = req.body.degree
        data.location = req.body.location
        data.specality = req.body.specality
        data.grade = req.body.grade
        data.beginDate = req.body.beginDate
        data.endDate = req.body.endDate
        data.save()
        res.send('OK')
        return
    }
    else{
        res.send('NO')
        return
    }
})

router.post('/admin/skill', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log('i am here 6')
    console.log(req.body.guidId)
    let data = await Skill.findById(req.body.guidId)
    if (data) {
        data.name = req.body.name
        data.className = req.body.className
        data.rate = req.body.rate
        data.save()
        res.send('OK')
        return
    }
    else{
        res.send('NO')
        return
    }
})

router.post('/admin/workflow', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log('i am here 8')
    console.log(req.body.guidId)
    let data = await Workflow.findById(req.body.guidId)
    if (data) {
        data.description = req.body.description
        data.save()
        res.send('OK')
        return
    }
    else{
        res.send('NO')
        return
    }
})

router.post('/admin/interest', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log('i am here 8')
    console.log(req.body.desc)
    console.log(req.body.guidId)
    let data = await Interest.findById(req.body.guidId)
    if (data) {
        data.description = req.body.description
        data.save()
        res.send('OK')
        return
    }
    else{
        res.send('NO')
        return
    }
})

router.post('/admin/award', async function (req, res){
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log('i am here 8')
    console.log(req.body.desc)
    console.log(req.body.guidId)
    let data = await Award.findById(req.body.guidId)
    if (data) {
        data.description = req.body.description
        data.save()
        res.send('OK')
        return
    }
    else{
        res.send('NO')
        return
    }
})

router.post('/admin/password', async function (req, res){
    console.log(111)
    console.log(req.session.userId)
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }
    
    console.log(req.body.guidId)
    let data = await User.findById(req.session.userId)
    if (data) {
        data.username = req.body.username
        data.password = req.body.password
        data.role = req.body.role
        data.save()
        res.send('OK')
        return
    }
    else{
        res.send('NO')
        return
    }
})
 
router.post('/admin/login', function(req, res) {
    User.findOne({username : req.body.username, password : req.body.password}, (u,e)=>{
        console.log(e)
        if(e){
            req.session.userId = e._id
            res.redirect('/admin/index')
            return
        }
        res.send('NO')
        return
    })
})

router.get('/admin/test', async (req, res) => {
    let result = await checkAuth(req.session.userId)
    if(result === true){
        res.send('Good')
    }
    else{
        res.send('Bad')
    }
})

router.get('/admin/workflowDelete/:objId', async (req, res) => {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }

    Workflow.findByIdAndDelete(req.params.objId, async (err) => {
        
        console.log('err')
        console.log(err)
        if (err === null) {
            res.send('OK')
        }
        else{
            res.send('NO')
        }
    })
})

router.get('/admin/skillDelete/:objId', async (req, res) => {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }

    Skill.findByIdAndDelete(req.params.objId, async (err) => {
        
        console.log('err')
        console.log(err)
        if (err === null) {
            res.send('OK')
        }
        else{
            res.send('NO')
        }
    })
})

router.get('/admin/InterestDelete/:objId', async (req, res) => {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }

    Interest.findByIdAndDelete(req.params.objId, async (err) => {
        
        console.log('err')
        console.log(err)
        if (err === null) {
            res.send('OK')
        }
        else{
            res.send('NO')
        }
    })
})

router.get('/admin/experienceDelete/:objId', async (req, res) => {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }

    Experience.findByIdAndDelete(req.params.objId, async (err) => {
        
        console.log('err')
        console.log(err)
        if (err === null) {
            res.send('OK')
        }
        else{
            res.send('NO')
        }
    })
})

router.get('/admin/educationDelete/:objId', async (req, res) => {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }

    Education.findByIdAndDelete(req.params.objId, async (err) => {
        
        console.log('err')
        console.log(err)
        if (err === null) {
            res.send('OK')
        }
        else{
            res.send('NO')
        }
    })
})

router.get('/admin/awardDelete/:objId', async (req, res) => {
    let auth = await checkAuth(req.session.userId)
    if (auth !== true) {
        res.redirect('/admin/login')
        return
    }

    Award.findByIdAndDelete(req.params.objId, async (err) => {
        
        console.log('err')
        console.log(err)
        if (err === null) {
            res.send('OK')
        }
        else{
            res.send('NO')
        }
    })
})

async function checkAuth(id){
    if(id == null || id == '' || id == undefined){
        return false
    }
    let result  = await  User.findById(id)
    if (result) {
        return true
    }
    return false
}

function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

module.exports = router