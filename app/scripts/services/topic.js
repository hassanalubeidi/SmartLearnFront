'use strict';

/**
 * @ngdoc service
 * @name smartLearnIoApp.topic
 * @description
 * # topic
 * Factory in the smartLearnIoApp.
 */
angular.module('smartLearnIoApp')
    .factory('Topic', function($http, apiBaseUrl) {
        var baseURL = apiBaseUrl + '/topics/';

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
            where: function(clauses) {
                return $http.get(baseURL + createfindByQuery(clauses));
            },
            get: function(id) {
                return $http.get(baseURL + id);
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