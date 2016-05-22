var myApp = angular.module('TwitchApp', ['ui.materialize']);

myApp.controller('TwitchCtrl', ["$scope", "$http", function($scope, $http){
  $scope.usernames = [
    "freecodecamp",
    "storbeck",
    "terakilobyte",
    "habathcx",
    "RobotCaleb",
    "thomasballinger",
    "noobs2ninjas",
    "beohoff",
    "Sensei_wu2",
    "OnExFpS",
    "aloysia_",
    "MrTyghf",
    'brunofin',
    'comster404'
  ];
  $scope.offline_users = [];
  $scope.online_users = [];

  angular.forEach($scope.usernames, function(name, key){
    $http.get('https://api.twitch.tv/kraken/streams/' + name).
      then(function successCallback(response) {
        console.log('response is', response);
        var data = response.data;
        if (data.stream === null) {
          data.stream = "offline";
          var offline_info = {
            'name': name,
            'status': data.stream
          };


// Second request to get the url for the offline users.
          $http.get('https://api.twitch.tv/kraken/channels/' + name).
           then(function successCallback(response) {
            offline_info.url = response.data.url;
          }, function errorCallback(response) {
            console.log('error channel response is: ', response);
          });




          $scope.offline_users.push(offline_info);
        } else {
          $scope.online_users.push(data.stream);
        }
      }, function errorCallback(response) {
        console.log('error response is: ', response);

      });
   });

}]);
