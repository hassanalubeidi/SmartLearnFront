'use strict';

/**
 * @ngdoc service
 * @name smartLearnIoApp.problem
 * @description
 * # problem
 * Service in the smartLearnIoApp.
 */
angular.module('smartLearnIoApp')
    .factory('TestPaper', function($http, Parse, apiBaseUrl) {
        var baseURL = apiBaseUrl + '/test-papers/';
        return {
            getAll: function() {
                return $http.get(baseURL);
            },
            get: function(id) {
                return $http.get(baseURL + id);
            },
            create: function(newTestPaper) {
                $http({
                        url: baseURL,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/vnd.api+json' },
                        data: {"data": {"type":"problems", "attributes": newTestPaper } }
                });
            },
            createAndParse: function(newTestPaper, url) {
                $http({
                        url: baseURL,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/vnd.api+json' },
                        data: {"data": {"type":"test-papers", "attributes": newTestPaper } }
                }).then(function(response) {
                    Parse.Paper(url)
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
