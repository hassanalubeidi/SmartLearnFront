'use strict';

/**
 * @ngdoc service
 * @name smartLearnIoApp.problem
 * @description
 * # problem
 * Service in the smartLearnIoApp.
 */
angular.module('smartLearnIoApp')
    .factory('Parse', function($http) {
        var baseURL = 'http://127.0.0.1:3000/parse/';
        return {
            Paper: function(url) {
                return $http.get(baseURL + "paper?url=" + url);
            }
        };
    });