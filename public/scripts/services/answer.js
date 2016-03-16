/* global i */
'use strict';

/**
 * @ngdoc service
 * @name smartLearnIoApp.problem
 * @description
 * # problem
 * Service in the smartLearnIoApp.
 */
angular.module('smartLearnIoApp')
    .factory('Answer', function($http, apiBaseUrl) {
        var baseURL = apiBaseUrl + '/answers/';
        
        function createfindByQuery(clauses) {
            var query = '?';
            for(var clause in clauses) {
                query += '&filter[' + clause + ']=' + clauses[clause];
            }
            return query;
        }
        
        return {
            getAll: function() {
                return $http.get(baseURL);
            },
            get: function(id) {
                return $http.get(baseURL + id);
            },
            find: function(clauses) {
                return $http.get(baseURL + createfindByQuery(clauses));
            },
            create: function(newProblem) {
                $http.post({
                        url: baseURL,
                        headers: { 'Content-Type': 'application/vnd.api+json' },
                        data: {"data": {"type":"answers", "attributes": newProblem}}
                })
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
