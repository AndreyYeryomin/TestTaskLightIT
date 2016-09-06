/**
 * Created by Andrey on 03.09.2016.
 */
'use strict';
var productlistApp = angular.module('productlistApp', ['ngRoute','ngCookies']);

productlistApp.run(['$http', '$cookies', function ($http){
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    if($.session.get("Token")!==undefined){
        $http.defaults.headers.post['Authorization']="Token " + $.session.get("Token");
        $("#Authorization").css("display","none");
        $("#exit").css("display","block");
    }else{
        $http.defaults.headers.post['Authorization']="";
        $("#Authorization").css("display","block");
        $("#exit").css("display","none");
    }

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
    $http.get('http://smktesting.herokuapp.com/api/products/').success(function (data) {
        $scope.product = data;
    })
});

productlistApp.controller('product1Ctrl', function ($scope, $http) {
    $http.get('http://smktesting.herokuapp.com/api/reviews/1').success(function (data) {
        $scope.reviews1 = data;
    })
});

productlistApp.controller('product2Ctrl', function ($scope, $http) {
    $http.get('http://smktesting.herokuapp.com/api/reviews/2').success(function (data) {
        $scope.reviews2 = data;
    })
});

productlistApp.controller('registrationCtrl', function ($scope, $http ) {
    $scope.newName = "";
    $scope.newPass = "";
    $scope.regUser = function() {
        var data = $.param({
            username: $scope.newName,
            password: $scope.newPass
        });

        $http.post("http://smktesting.herokuapp.com/api/register/", data).success(function(data, status) {
        })

    }
});
productlistApp.controller('signInCtrl', function ($scope, $http) {
    $scope.userName = "";
    $scope.userPass = "";
    $scope.signIn = function() {
        var data = $.param({
            username: $scope.userName,
            password: $scope.userPass
        });
        $http.post("http://smktesting.herokuapp.com/api/login/", data).success(function (data) {
            if(data.token == undefined){
                alert('Enter correct information')
            }else{
                $.session.set("Token", data.token);
                $http.defaults.headers.post['Authorization']="Token " + $.session.get("Token");
                $("#Authorization").css("display","none");
                $("#exit").css("display","block");
            }

        });

    }

});

productlistApp.controller('signOutCtrl', function ($scope) {
    $scope.signOut = function() {
        $.session.remove("Token");
        setInterval("location.reload()", 100);
    }
});

productlistApp.controller('addReviews', function ($scope, $http) {
    $scope.rate = "";
    $scope.text = "";
    $scope.addComments = function() {
        if ($.session.get("Token") !== undefined) {
            var data = $.param({
                rate: $scope.rate,
                text: $scope.text
            });
            $http.post("http://smktesting.herokuapp.com/api/reviews/" + $("#id").attr("option"), data).success(function (data, status) {
            });
            $('form[id="reviews"] input[type="text"]').val('');
        }else{
            $('form[id="reviews"] input[type="text"]').val('');
            alert("You should sign in first");
        }
    }
});