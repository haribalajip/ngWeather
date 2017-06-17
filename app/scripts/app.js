'use strict';

/**
 * @ngdoc overview
 * @name ngWeatherApp
 * @description
 * # ngWeatherApp
 *
 * Main module of the application.
 */
var weatherApp = angular
  .module('ngWeatherApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);
weatherApp.config(function ($routeProvider,$locationProvider) {
  $routeProvider
    /*.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'about'
    })
    .otherwise({
      redirectTo: '/'
    });*/
    .when('/',{
    templateUrl:"views/home.html",
    controller:"homeController"
    })
    .when('/forecast',{
    templateUrl:"views/forecast.html",
    controller:"forecastController"

    })
    .when('/forecast/:num',{
    templateUrl:"views/forecast.html",
    controller:"forecastController"
    })
    .when('/home',{
    templateUrl:"views/home.html",
    controller:"homeController"
    })
    
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});


//services
weatherApp.service('forecastService',function(){
this.city="bangalore";
})

//controller
weatherApp.controller('homeController',['$scope','forecastService',function($scope,forecastService){
  $scope.city=forecastService.city;
  $scope.$watch('city',function(){
    forecastService.city=$scope.city;
  });    
}]);

weatherApp.controller("forecastController",['$scope','$resource','$routeParams','forecastService',function($scope,$resource,$routeParams,forecastService){
  alert('forecast');
  $scope.city=forecastService.city;
  this.appid="4fd4dd83b901576fbcde60961152fdd2";    
  $scope.days=$routeParams.num||2;
      
      $scope.convertToDate = function(dt) { 
        
          return new Date(dt * 1000);
          
      };    
      $scope.convertToCelsius=function(temp){
          return Math.round(temp-273);
      }
  $scope.weatherAPI=$resource("http://api.openweathermap.org/data/2.5/forecast/daily?");
  $scope.weatherResult=$scope.weatherAPI.get({q:$scope.city,cnt:$scope.days,appid:this.appid});
      console.log($scope.weatherResult);
}]);

//Directives
weatherApp.directive('weatherReport',function(){
return {
    templateUrl:"directives/weatherReport.html",
   
       }
});