var artistControllers = angular.module('artistControllers', []);  //the '[]' will house the dependecies for the app

myApp.controller('ListController', ['$scope', '$http', function($scope, $http){  //the scope is a super variable that allows us to pass things from js to application/template
  $http.get('js/data.json').success(function(data){
    $scope.artists = data;
    $scope.artistOrder = 'name';

  });
}]);
