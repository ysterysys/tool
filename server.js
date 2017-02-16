var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

var PostSchema = mongoose.Schema({ //structure 
	title: {type:String,required:true},
    posted: { type:Date, default: Date.now},
	is_tag: {type:Boolean, default: false},
	edit: {type:Boolean, default: false},
},{collection:'Comment'});
 var PostModel = mongoose.model("comment",PostSchema); //object to interact with db
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));
app.post("/api/blogpost", createPost);
app.get("/api/blogpost", getAllPosts);
app.delete("/api/blogpost/:id",deletePost);
app.get("/api/blogpost/:id",getPostById);
app.put("/api/blogpost/:id", updatePost);


function getAllPosts(req,res){
	PostModel
		.find()
		.then(
		function(posts){
			res.json(posts);
		},
		function (err){
			res.sendStatus(400);
		}
		);
}
function createPost(req,res){ //req is request , res is response
	var post = req.body;
	console.log(post);
	PostModel.create(post);
	res.json(post);
}

function deletePost(req,res){
	var postId = req.params.id;
	PostModel
	.remove({_id:postId})
	.then(
		function(status){
			res.sendStatus(200);
		},
		function(){
			res.sendStatus(400);
		}
	);
	
}

function getPostById(req,res){
	var postId = req.params.id;
	PostModel
		.findById(postId)
		.then(
			function (post){
			res.json(post);	
				
			},
			function(err){
				res.sendStatus(400);
			}
		
		);
	
}

function updatePost(req,res){
	var postId= req.params.id;
	var post = req.body;
	PostModel
		.update({_id:postId},{
				title:post.title
			})
			.then(
				function(status){
					res.sendStatus(200);
				},
				function(err){
					res.sendStatus(400);
				}
			);
}

app.use(express.static(__dirname + '/public'));
app.listen(3000);