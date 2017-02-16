var app = 
angular.module('tasktool', ['ui.router'])


app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);

/*app.config(function($routeProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'index.html'
    })
	.otherwise({
		redirectTo:'/'
	});
  
});

app.controller('loginCtrl',['$scope','$location',function($scope,$location){
	$scope.submit = function(){
		var username = $scope.username;
		var pw = $scope.password;
		if(username){
			$location.path('/summary.html');
		}
	};
	
}]);
*/
app.controller('MainCtrl', ['$scope',
'posts','$http',function($scope, posts,$http){
	
	function init(){
		getAllPost();
	}
	init();
	
 
	$scope.addPost = function(){
	  if(!$scope.title || $scope.title === '') { return; }
	  $scope.posts.push({
		title: $scope.title,
		link: $scope.link,
		upvotes: 0
	  });
	  $scope.title = '';
	  $scope.link = '';
	};
	$scope.incrementUpvotes = function(post) {
	  post.upvotes += 1;
	};
	$scope.createPost = createPost; // post to db
		function createPost(post){
		console.log(post);
		$http.post("/api/blogpost",post)
		getAllPost();
		}
	$scope.getAllPost = getAllPost; //get from db
	function getAllPost(){
		$http
		.get("/api/blogpost")
		.success(function(posts){
			$scope.posts = posts;
			
		});
	}

	$scope.deletePost = deletePost; //dele from db
	function deletePost(postId){
		$http.delete("/api/blogpost/"+postId)
		getAllPost();
		
	}

$scope.editPost = editPost; // 
	function editPost(post){
		$http
		.get("/api/blogpost/"+post)
		.success(function(post){
			$scope.post = post;
		});
	
	}
$scope.updatePost = updatePost;
 function updatePost(post){
	 $http
	 .put("/api/blogpost/"+post._id,post)
	 .success(getAllPost);
	
 }
$scope.toggle = function() {
        $scope.editBox = !$scope.editBox;
    };

$scope.editTag = editTag; // 
	function editTag(post){
		
		editPost(post);
		if(event.which == 13 && postId != ""){
			updatePost(postId);
		}
		
	}
	$scope.contentEdit = function(post){
		post.edit=true;
		console.log(post.edit);
	};
	
	$scope.doneEditing = function(post){
		post.edit=false;
		updatePost(post);
		getAllPost();
	};
	$scope.createTag= function(){
		var displayText = $scope.tagging;
		var tag = "{ \"title\": \""+$scope.tagging+"\", \"is_tag\": true}";
		console.log(tag);
		$http.post("/api/blogpost",tag)
			.success(function(tag, status,headers,config){
			getAllPost();
			$scope.tagging='';
			})
			.error(function(tag,status,header,config){
				$scope.tagging = "tag:"+status;
			});
	
	}
}]);

