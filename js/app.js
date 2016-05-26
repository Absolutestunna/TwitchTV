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

  var usernames = $scope.usernames;


  $scope.addUser = function(e){
    if (e.which && e.which === 13){
      usernames.push($scope.user);
      $scope.tItem = "";
      startForEach(usernames);
      $scope.user = "";
    }
  };
    startForEach(usernames);


    function startForEach(usernames){

      $scope.offline_users = [];
      $scope.online_users = [];
      $scope.inactive_users = [];


      angular.forEach(usernames, function(name, key){
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
      //end of second api request

              $scope.offline_users.push(offline_info);
            } else {
              $scope.online_users.push(data.stream);
            }
          }, function errorCallback(response) {
            console.log('error response is: ', response);
            $scope.inactive_users.push(name);

          });
       });
    };
  // }); //end of invoked function



}]);
