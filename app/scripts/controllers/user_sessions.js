'use strict';

/**
 * @ngdoc function
 * @name fakeLunchHubApp.controller:UserSessionsCtrl
 * @description
 * # UserSessionsCtrl
 * Controller of the fakeLunchHubApp
 */
angular.module('smartLearnIoApp')
  .controller('UserSessionsCtrl', ['$scope', '$auth', '$rootScope', function ($scope, $auth, $rootScope) {
      $rootScope.$on('auth:login-success', function(ev, user) {
        });
      $scope.$parent.wide = $scope.wide
      $scope.handleRegBtnClick = function() {
        $auth.submitRegistration($scope.registrationForm)
            .then(function() { 
                $auth.submitLogin({
                    email: $scope.registrationForm.email,
                    password: $scope.registrationForm.password
                });
            });
      };
  }]);