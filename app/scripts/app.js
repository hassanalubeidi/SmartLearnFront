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
  .constant('apiBaseUrl', 'http://api.smartlearn.io/')
  .run(['$rootScope', '$location','authProvider', function($rootScope, $location, authProvider) {
    // if (!authProvider.isLoggedIn()) {
    //       console.log('DENY : Redirecting to Login');
    //       $location.path('/signin');
    // }  
      
    $rootScope.$on('auth:login-success', function() {
        $location.path('/');
    });
    $rootScope.$on('auth:logout-success', function() {
        $location.path('/sign_in');
    });
  }])
  .config(function($routeProvider, $authProvider, $stateProvider, $httpProvider, $urlRouterProvider, apiBaseUrl) {
    //$httpProvider.defaults.headers.get = { 'Content-Type' : 'application/vnd.api+json' }
    $authProvider.configure({
        apiUrl: apiBaseUrl,
    });
    $urlRouterProvider.otherwise('/');
    $stateProvider
      // this state will be visible to everyone
      .state('index', {
        url: '/',
        controller: 'IndexCtrl',
        templateUrl: 'views/main.html',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .state('admin', {
        url: '/admin',
        controller: 'AdminController',
        templateUrl: 'views/admin/index.html',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .state('test_paper_show', {
          url: '/test-papers/:id',
          templateUrl: 'views/test-papers/show.html',
          controller: 'TestPaperController'
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
      .state('join_classroom', {
          url: '/classrooms/join',
          templateUrl: 'views/classrooms/join.html',
          controller: 'classroomsController',
          reslove: {
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
      .state('profile_show', {
          url: '/profiles/:id',
          templateUrl:'views/profile/show.html',
          controller: 'ProfileCtrl'
      })
      .state('signin', {
          url: '/signin',
          templateUrl: 'views/user_sessions/new.html'
      })
      .state('signup', {
          url: '/signup',
          controller: 'UserSessionsCtrl',
          templateUrl: 'views/user_registrations/new.html'
      })
      .state('subject_show', {
        url: '/subjects/:id',
        templateUrl: 'views/subjects/show.html',
        controller: 'SubjectsCtrl',
        controllerAs: 'subjects'
      })
      .state('teacher_subject_show', {
          url: '/subjects/:subject_id/user/:user_id',
          templateUrl: 'views/teacher/subjects/show.html',
          controller: 'SubjectsCtrl',
          controllerAs: 'subjects'
      })
  })
  .filter('reverse', function() {
    return function(items, total) {
        if (typeof(items) == "object") {
            return items.slice().reverse();
        }else {
            return items
        }
        
    };
  })
  .controller('IndexCtrl', ['$scope', '$stateParams', 'User', 'JsonAPI', '$rootScope',  function ($scope, $stateParams, User, $rootScope, JsonAPI) {
      User.get($scope.user.id).then(function(response) {
          $scope.current_user = response.data.data.attributes
      })
  }])
  
  