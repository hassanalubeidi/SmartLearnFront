'use strict';

/**
 * @ngdoc directive
 * @name smartLearnIoApp.directive:topNavbar
 * @description
 * # topNavbar
 */
angular.module('smartLearnIoApp')
  .directive('topNavbar', function () {
    return {
      templateUrl: 'scripts/directives/topnavbar/topnavbar.html',
      restrict: 'E'
    };
  });
