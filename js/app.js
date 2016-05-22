var myApp = angular.module('TwitchApp', []);

myApp.controller('TwitchCtrl', function($scope, $http){
  $http.get('https://api.twitch.tv/kraken/streams/freecodecamp').
    then(function successCallback(response) {
      console.log('success response is: ', response);
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    console.log('error response is: ', response);

    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $scope.message = "Connected";
});
