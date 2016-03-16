'use strict';

/**
 * @ngdoc service
 * @name smartLearnIoApp.problem
 * @description
 * # problem
 * Service in the smartLearnIoApp.
 */
angular.module('smartLearnIoApp')
    .factory('Parse', function($http, apiBaseUrl) {
        var baseURL = apiBaseUrl + '/parse/';
        return {
            Paper: function(url) {
                return $http.get(baseURL + "paper?url=" + url);
            }
        };
    });