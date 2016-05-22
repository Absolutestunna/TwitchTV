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
    "MrTyghf"
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
          $http.get('https://api.twitch.tv/kraken/channels/storbeck').
           then(function successCallback(response) {
            console.log('success chanel response is', response);
            offline_info.url = response.data.url;
            console.log('offline info is: ', offline_info);
          }, function errorCallback(response) {
            console.log('error channel response is: ', response);
          });



          $scope.offline_users.push(offline_info);
          console.log('offline users', $scope.offline_users);
        } else {
          $scope.online_users.push(data.stream);
          console.log('online users', $scope.online_users);
        }
      }, function errorCallback(response) {
        console.log('error response is: ', response);

      });
  });

}]);
