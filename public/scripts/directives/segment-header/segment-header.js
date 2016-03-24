'use strict';

/**
 * @ngdoc directive
 * @name smartLearnIoApp.directive:topNavbar
 * @description
 * # topNavbar
 */
angular.module('smartLearnIoApp')
  .directive('segmentHeader', function () {
    return {
      templateUrl: 'scripts/directives/segment-header/segment-header.html',
      restrict: 'E',
      transclude: true
    };
  })
