var app1  = angular.module("firstapp", []);
app1.controller("ctrl" , function($scope, $http){
  $http.get("http://localhost:8080/data/").then(function (response) {
    console.log(response.data)
    var info = response.data
    var current = info.length - 1;
    $scope.biography = info[current].biography;
  });
});

  app1.controller("secondctrl" , function($scope, $http) {
    $http.get("http://localhost:8080/data2/").then(function(response){
      var info = response.data
      var current = info.length - 1;
      $scope.PhoneNumber = info[current].PhoneNumber;
      $scope.Extention = info[current].Extention;
      $scope.Address = info[current].Address;
      $scope.EmailAddress = info[current].EmailAddress;
    });
  });


//   $scope.changeOrder = function changeOrder(o){
//     $scope.order = o;
//   }
 //
//});
