const express = require('express');
const bodyParser = require('body-parser');
const request = require('superagent');

const app = express();

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})

const mailchimpInstance     = 'us16',
listUniqueId                = '39a1883fa4',
mailchimpApiKey             = 'a5ca19a25081259e54a1ab6978c01068-us16';

app.post('/', (req, res) => {
    request
    .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
    .send({
      'email_address': req.body.email,
      'status': 'subscribed',
      'merge_fields': {
        'FNAME': req.body.firstname,
        'LNAME': req.body.lastname
      }
    })
    .end((err, response)=> {
        if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
          res.sendFile(__dirname + '/success.html');
        } else {
          res.sendFile(__dirname + '/error.html');
        }
    });
});

app.listen(3000, (req, res) => {
    console.log('Server listening on port 3000...');
});