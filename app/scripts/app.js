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
  
    .when('/',{
    templateUrl:"views/home.html",
    controller:"homeController"
    })
    .when('!/forecast',{
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
    
    $locationProvider.html5Mode(false).hashPrefix('');
});


//services
weatherApp.service('forecastService',function(){
  this.city="Chennai";
});
//factory
weatherApp.factory('iconService',function(){
  return {
    fn:function(id){
      if(id>=200 && id<=232)
        this.iconClass = 'wi wi-thunderstorm';
      
      if(id>=300 && id<=321)
        this.iconClass = 'wi wi-sprinkle';
      
      if (id>=500 && id<=531) 
        this.iconClass = 'wi wi-rain';
      
      if (id>=600 && id<=22) 
        this.iconClass = 'wi wi-snow';
      
      if (id>=700 && id<=781) 
        this.iconClass = 'wi wi-windy';
      
      if (id== 800) 
        this.iconClass = 'wi wi-day-sunny';
      
      if (id>=801 && id<=804) 
        this.iconClass = 'wi wi-cloudy';
      
      if (id>=900 && id<=960) 
        this.iconClass = 'wi wi-tornado';
      
      return this.iconClass;
    }
  }
  
});

//controller
weatherApp.controller('homeController',['$scope','forecastService',function($scope,forecastService){
  $scope.city=forecastService.city;
  $scope.$watch('city',function(){
    forecastService.city=$scope.city;
  });    
}]);

weatherApp.controller("forecastController",['$scope','$resource','$routeParams','forecastService', 'iconService' ,function($scope,$resource,$routeParams,forecastService,iconService){
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
  console.log(iconService.fn(300));
  $scope.$watch(function(scope) { return scope.weatherResult.$resolved },
    function(newValue, oldValue) {
      console.log(newValue);
      if(newValue) {
        console.log($scope.weatherResult.list);
        $scope.weatherResult.list.map((item,index)=>{
          $scope.weatherResult.list[index]['iconClass']  = iconService.fn(item.weather[0].id);        
          console.log(item.weather[0].id)  ;
        });
        console.log($scope.weatherResult.list);
      }
    }
   );
  
}]);

//Directives
weatherApp.directive('weatherReport',function(){
  return {
    templateUrl:"views/weatherReport.html",

  }
});