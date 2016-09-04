/**
 * Created by Andrey on 03.09.2016.
 */
'use strict';
 var productlistApp = angular.module('productlistApp', ['ngRoute','ngCookies']);

productlistApp.run(['$http', '$cookies', function ($http, $cookies){
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

}]);

 productlistApp.config(['$routeProvider', function ($routeProvide) {
     $routeProvide
         .when('/product1', {
             templateUrl: 'temp/product1.html',
             controller: 'product1Ctrl'
         })
         .when('/product2', {
             templateUrl: 'temp/product2.html',
             controller: 'product2Ctrl'
         })
         .when('/registration', {
             templateUrl: 'temp/registration.html',
             controller: 'registrationCtrl'
         })
         .otherwise({
         redirectTo: '/'
     });
 }
 ]);

productlistApp.controller('ListCtrl', function ($scope, $http) {
  $http.get('http://smktesting.herokuapp.com/api/products/').success(function (data, status, headers, config) {
      $scope.product = data;
  })
});

productlistApp.controller('product1Ctrl', function ($scope, $http, $location) {
    $http.get('http://smktesting.herokuapp.com/api/reviews/1').success(function (data, status, headers, config) {
        $scope.reviews1 = data;
    })
});

productlistApp.controller('product2Ctrl', function ($scope, $http, $location) {
    $http.get('http://smktesting.herokuapp.com/api/reviews/2').success(function (data, status, headers, config) {
        $scope.reviews2 = data;
    })
});

productlistApp.controller('registrationCtrl', function ($scope, $http, $location) {
    $scope.newName = "";
    $scope.newPass = "";
    $scope.regUser = function() {
        var data = $.param({
                username: $scope.newName,
                password: $scope.newPass
        });
        console.log(data);
        $http.post("http://smktesting.herokuapp.com/api/register/", data).success(function(data, status) {

        })

    }
});
productlistApp.controller('signInCtrl', function ($scope, $http, $location, $cookies) {
    $scope.userName = "";
    $scope.userPass = "";
    $scope.signIn = function() {
        var data = $.param({
            username: $scope.userName,
            password: $scope.userPass
        });
        $http.post("http://smktesting.herokuapp.com/api/login/", data).success(function (data, status) {
            $http.defaults.headers.post['Authorization']="Token " + data.token;
        });

    }

});
productlistApp.controller('addReviews', function ($scope, $http, $location) {
    $scope.rate = "";
    $scope.text = "";
    $scope.addComments = function() {
        var data = $.param({
            rate: $scope.rate,
            text: $scope.text
        });
        console.log(data);
        $http.post("http://smktesting.herokuapp.com/api/reviews/1", data).success(function(data, status) {

        })

    }
});