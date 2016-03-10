'use strict';

/**
 * @ngdoc function
 * @name smartLearnIoApp.controller:MainCtrl
 * @description; 
 * # MainCtrl
 * Controller of the smartLearnIoApp
 */
angular.module('smartLearnIoApp')
  .controller('MainCtrl', ['$scope','$timeout', '$auth', function ($auth) {
      $auth.validateUser()
     
  }]);
