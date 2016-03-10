'use strict';

/**
 * @ngdoc service
 * @name smartLearnIoApp.problem
 * @description
 * # problem
 * Service in the smartLearnIoApp.
 */
angular.module('smartLearnIoApp')
    .service('MainQuestion', function($http) {
        // Public
        // CRUD
        var baseURL = 'http://127.0.0.1:3000/main_questions';
        this.getAll = function() {
            $http.get(baseURL);
        };
        this.get = function(id) {
            $http.get(baseURL + id);
        };
        this.create = function(newProblem) {
            $http({
                    url: baseURL,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/vnd.api+json' },
                    data: newProblem
            });
        };
        this.delete = function(id) {
           $http({
                    url: baseURL + id,
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/vnd.api+json' }
           });
       };
       this.findBy = function(clauses) {
           $http({
                    url: 'baseURL' + createfindByQuery(clauses),
                    method: 'GET',
                    headers: { 'Content-Type': 'application/vnd.api+json' }
           });
       };
       // Private
       function createfindByQuery(clauses) {
            var query = '?';
            for(var clause in clauses) {
                query += '&filter[' + clause + ']=' + clauses[clause];
            }
            return query;
        }
    });