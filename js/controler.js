/**
 * Created by Andrey on 03.09.2016.
 */
'use strict';
 var productlistApp = angular.module('productlistApp', []);

productlistApp.controller('ListCtrl', function ($scope,$http) {
  $http.get('http://smktesting.herokuapp.com/api/products/').success(function (data, status, headers, config) {
     console.log(data, status,headers,config); 
  })
});