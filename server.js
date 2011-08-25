var express = require('express'),
	path = require('path'),
	nowjs = require('now'),
	browserify = require('browserify'),
	mongoose = require('mongoose'),
	server;

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
			from: {type: String}
		, message: {type: String}
		, sentAt: {type: Date, default: Date.now}
});

var LogSchema = new Schema({
			title: {type: String, trim: true}	
		, createdAt: {type: Date, default: Date.now}
		, messages: [MessageSchema]
});

var ChatLog = mongoose.model('Chat', LogSchema);

server = express.createServer();

server.configure(function configureAppAndMiddleware() {
	server.set('view engine', 'jade');
	server.set('view', path.join(__dirname, 'views'));

	server.use(express.bodyParser());
	server.use(express.cookieParser());
	server.use(express.static(path.join(__dirname, 'public')));
	server.use(browserify({
		require: path.join(__dirname, 'client/index')
	}));
});


server.get('/', function showHomePage(req, res) {
	res.render('index.jade');
});

server.listen(8080);

console.log('Running on 8080');

var everyone = nowjs.initialize(server);

nowjs.on('connect', function(){
	console.log(this.now.name + ', joined.');
});

nowjs.on('disconnect', function(){
	console.log(this.now.name + ' has left the building.');
});

everyone.now.sendMessage = function(message) {
	everyone.now.receiveMessage(this.now.name, message);
};
