'use strict';

/**
 * @ngdoc directive
 * @name smartLearnIoApp.directive:topNavbar
 * @description
 * # topNavbar
 */
angular.module('smartLearnIoApp')
    .directive('backButton', function () {
        return {
            template: '<a class="ui tiny icon circular button" style="margin-bottom:10px"><i class="ui left arrow icon"></i> Back</a>',
            link: function(scope, element, attrs) {
                $(element[0]).on('click', function() {
                    history.back();
                    scope.$apply();
                });
            }
        };
  });





