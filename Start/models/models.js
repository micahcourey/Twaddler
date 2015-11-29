var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
	creator: { type: Schema.ObjectId, ref: 'User' },
	created: {type: Date, default: Date.now},
	text: String
});

var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from password
	created: {type: Date, default: Date.now}
})


mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);
