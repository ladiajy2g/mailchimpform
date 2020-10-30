const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const superagent = require('superagent');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
});

app.post('/', (req, res) =>{
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const mailchimpInstance = 'us6';
    const audienceId = '39a1883fa4';
    const apiKey = 'a5ca19a25081259e54a1ab6978c01068-us16';

    const data ={
        members:[
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LASTNAME: lastName
                }
            }
        ]
    }
    
    const jsonData = JSON.stringify({data});
    const url = 'https://us16.api.mailchimp.com/3.0/lists/39a1883fa4/members/';
    
    const options ={
        method: 'POST',
        auth: 'dipo1:a5ca19a25081259e54a1ab6978c01068-us16'
    }
    
    const request =  https.request(url, options, (response) => {
        response.on('data', (data) => {
            console.log(JSON.parse(data));
        })
    });
    
    request.write(jsonData);
    request.end();
});


//     app.post('/', (req, res) => {
//         request
//     .post('https://'+mailchimpInstance+'.api.mailchimp.com/3.0/lists/'+audienceId+'/members/')
//     .set('Content-Type', 'application/json;charset=utf-8')
//     .set('Authorization', 'Basic' + new Buffer('any:'+apiKey).toString('base64'))
//     .send({
//         'email_address':email,
//         'status':'subscribed',
//         'merge_fields':{
//             'FNAME':firstName,
//             'LANME':lastName,
//         }
//     })
//     .end((err, response) => {
//         console.log(response.status);
//         // if(response.status < 300 || (response.satus === 4000 && response.body.title ==='Member Exists')){
//         //     res.sendFile(__dirname + '/success.html');
//         // }else{
//         //     res.sendFile(__dirname + '/error.html');
//         // }
//         });

// });

app.listen(3000, () => {
    console.log('Server is running on port 3000...')
})

// audience id: 39a1883fa4
// api key: a5ca19a25081259e54a1ab6978c01068-us16


