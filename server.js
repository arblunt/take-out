const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/employee', routes.employee)
app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.use('/company', routes.company)

app.use('/entries', routes.entry)

app.listen(3000, ()=>{
	console.log('listening....');
});