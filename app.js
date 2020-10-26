const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
var multer = require('multer');

const forms = multer();
const app = express();
const port = process.env.PORT || 3000;

app.use('/demo', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(forms.array()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Nothing much here!')
})

app.post('/log-tracking', function(req, res) {
    console.log('**** Tracked. Now logging ****');
    let body = req.body;

    let startTime = body.start;
    let endTime = body.end;
    let trackInfo = body.msg;

    let logMsg = '';

    let time = (endTime - startTime) / 1000;
    logMsg = `${time.toFixed(2)} seconds`;

    if (time > 60) {
        time = time / 60;
        logMsg = `${time.toFixed(2)} minutes`;
    }

    console.log('In Session for: ', logMsg);
    console.log('Tracking info: ', trackInfo);
    
});

app.listen(port, () => {
  console.log(`User Tracking app listening at http://localhost:${port}`)
})