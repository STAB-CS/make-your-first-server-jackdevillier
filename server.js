const express = require('express');
const mustache = require('mustache-express');

const app = express();

app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + "/views");
app.set('view engine', 'mustache');
app.engine('mustache', mustache());

app.get("/", (req, res) => {
	res.render('home');
});

app.listen(8080, () => {
	console.log("server go vroom");
});
