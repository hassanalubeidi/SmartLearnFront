'use strict';

/**
 * @ngdoc service
 * @name smartLearnIoApp.problem
 * @description
 * # problem
 * Service in the smartLearnIoApp.
 */
angular.module('smartLearnIoApp')
    .factory('Question', function($http, apiBaseUrl) {
        var baseURL = apiBaseUrl + '/questions/';
        return {
            getAll: function() {
                return $http.get(baseURL);
            },
            get: function(id) {
                return $http.get(baseURL + id +  "?include=main-question");
            },
            create: function(newProblem) {
                $http({
                        url: baseURL,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/vnd.api+json' },
                        data: newProblem
                });
            },
            delete: function(id) {
                $http({
                        url: baseURL + id,
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/vnd.api+json' }
                });
            } 
        };
    });
