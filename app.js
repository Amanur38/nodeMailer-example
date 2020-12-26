const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()

const port = process.env.APP_PORT;

const NodeMailer = require('./nodeMailer')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to our mail api! The endpint is: /sendMail')
})

app.all('/sendMail', async (req, res) => {
    console.log(`sendMail endpoint GET`, req.query);
    console.log(`sendMail endpoint POST`, req.body);

    // for get request
    let to_get = req.query.to;
    let subject_get = req.query.subject;
    let body_get = req.query.body;

    // for post request
    let to_post = req.body.to;
    let subject_post = req.body.subject;
    let body_post = req.body.body;

    let to = to_get ? to_get : to_post;
    let subject = subject_get ? subject_get : subject_post;
    let body = body_get ? body_get : body_post;



    if (!to || !subject || !body) {
        return res.json({
            status: false,
            message: 'You need to pass query parameter as [to, subject, body]'
        })
    }
    try {
        let info = await NodeMailer.sendMail(to, subject, body);
        return res.json({
            status: true,
            message: 'Mail sent successfully!',
            accepted: info.accepted,
            rejected: info.rejected
        });
    } catch (err) {
        return res.json({ status: false, message: err })
    }
})

app.listen(port, () => {
    console.log(`App is running http://localhost:${port}`)
})