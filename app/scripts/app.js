'use strict';

/**
 * @ngdoc overview
 * @name smartLearnIoApp
 * @description
 * # smartLearnIoApp
 *
 * Main module of the application.
 */
angular
  .module('smartLearnIoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ng-token-auth',
    'ui.router'
  ])
  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('auth:login-success', function() {
        $location.path('/');
    });
    $rootScope.$on('auth:logout-success', function() {
        $location.path('/sign_in');
    });
  }])
  
  .config(function ($routeProvider, $authProvider, $stateProvider, $httpProvider) {
    $httpProvider.defaults.headers.get = { 'Content-Type' : 'application/vnd.api+json' }
    $authProvider.configure({
        apiUrl: 'http://127.0.0.1:3000',
    });
    
    $stateProvider
      // this state will be visible to everyone
      .state('index?wide', {
        url: '/',
        controller: 'IndexCtrl',
        templateUrl: 'views/main.html',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .state('teacher', {
        url: '/teacher',
        templateUrl: 'views/teacher/index.html',
        controller: 'TeacherCtrl',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .state('teacherAddTestPaper', {
        url: '/teacher/add/test-paper',
        templateUrl: 'views/teacher/add/test_paper.html',
        controller: 'TeacherCtrl',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .state('mistakes', {
            url: '/mistakes/:id',
            templateUrl: 'views/mistakes/show.html',
            controller: 'mistakesController',
            resolve: {
            auth: function($auth) {
                    return $auth.validateUser();
                }
            }
      })
      .state('interim_test_mistakes', {
          url: '/mistakes/add/interim_test/:id',
         templateUrl: 'views/mistakes/add/interim_test.html',
         controller: 'InterimTestMistakesController',
      })
      .state('signin', {
          url: '/sign_in',
          templateUrl: 'views/user_sessions/new.html'
      })
      .state('signup', {
          url: '/sign_up',
          controller: 'UserSessionsCtrl',
          templateUrl: 'views/user_registrations/new.html'
      })
      .state('subject_show', {
        url: '/subjects/:id',
        templateUrl: 'views/subjects/show.html',
        controller: 'SubjectsCtrl',
        controllerAs: 'subjects'
      })
  })
  .filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
  })
  .controller('IndexCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
    
  }])
  