/**
 * Created by Andrey on 03.09.2016.
 */
'use strict';
 var productlistApp = angular.module('productlistApp', ['ngRoute']);

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
