/**
 * Created by Andrey on 03.09.2016.
 */
'use strict';
 var productlistApp = angular.module('productlistApp', []);

// productlistApp.config(['routeProvider'], function ($routeProvider) {
//    $routeProvider
//        .when('/product1',{
//         templateUrl: 'temp/product1',
//            controller: 'product1Ctrl'
//     })
//        .when('/product2',{
//            templateUrl: 'temp/product2',
//            controller: 'product2Ctrl'
//        })
// });

productlistApp.controller('ListCtrl', function ($scope, $http, $location) {
  $http.get('http://smktesting.herokuapp.com/api/products/').success(function (data, status, headers, config) {
     console.log(data, status,headers,config);
      $scope.product = data;
  })
});