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
    .factory('Classroom', function($http) {
        var baseURL = 'http://127.0.0.1:3000/classrooms/';
        return {
            getAll: function() {
                return $http.get(baseURL);
            },
            get: function(id) {
                return $http.get(baseURL + id);
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