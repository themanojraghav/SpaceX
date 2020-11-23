const express = require('express');
const path = require('path');
const app = express();

app.use('/static', express.static('public'));
const port = process.env.PORT || 4000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on port ${port}`);
});
