(function() {
    //start of function
  var app = angular.module('urlshortener', []);

app.controller('MainCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.shortURL;
	$scope.generateShort = function(){
		$http.post($window.location.href+"new/http://"+$scope.userInputURL).success(function(data){$scope.shortURL=data;}).error(function(err){throw err;});
	};
}]);//end of controller
  //end of function
})();
