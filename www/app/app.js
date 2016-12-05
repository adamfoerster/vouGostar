(function() {
    'use strict';

	// angular.module is a global place for creating, registering and retrieving Angular modules
	// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
	// the 2nd parameter is an array of 'requires'
	// 'starter.services' is found in services.js
	// 'starter.controllers' is found in controllers.js
	angular
        .module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.constants', 'ngCordova'])

    	.run(function($ionicPlatform, $cordovaSQLite, $http, Filmes, $rootScope) {

            // $rootScope.BACKEND = 'http://localhost:8084/';
            $rootScope.BACKEND = 'http://ec2-52-41-8-252.us-west-2.compute.amazonaws.com:8081/';

    		$ionicPlatform.ready(function() {
    			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    			// for form inputs)
    			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    				cordova.plugins.Keyboard.disableScroll(true);
    			}
    			if (window.StatusBar) {
    				// org.apache.cordova.statusbar required
    				StatusBar.styleDefault();
    			}

    			// TODO: verificar a idade da lista local de filmes em cartaz e se estiver muito velha pede de novo.
    			// Pega a lista de filmes em cartaz
    			Filmes.getListaBackend()
    				.then(function(data){
    					Filmes.setEmCartaz(data);
    					Filmes.salvarLista(data);
    				})
    			;
    		});
    	})

    	// Ionic uses AngularUI Router which uses the concept of states
    	// Learn more here: https://github.com/angular-ui/ui-router
    	// Set up the various states which the app can be in.
    	// Each state's controller can be found in controllers.js
    	.config(function($stateProvider, $urlRouterProvider) {
    		$stateProvider

    		// setup an abstract state for the tabs directive
    		.state('tab', {
    			url: '/tab',
    			abstract: true,
    			templateUrl: 'app/tabs.html'
    		})

    		// Each tab has its own nav history stack:
    		.state('tab.dash', {
    			url: '/dash',
    			views: {
    				'tab-content': {
    					templateUrl: 'filmes/tab-dash.html',
    					controller: 'DashCtrl',
    				},
    			}
    		})

    		.state('tab.account', {
    			url: '/account',
    			views: {
    				'tab-content': {
    					templateUrl: 'account/tab-account.html',
    					controller: 'AccountCtrl'
    				},
    			}
    		})

    	    .state('tab.search', {
    			url: '/search',
    			views: {
    				'tab-content': {
    					templateUrl: 'filmes/tab-search.html',
    					controller: 'SearchCtrl'
    				},
    			}
    		})

    		.state('tab.filme', {
    			url: '/filme/:filmeId',
    			views: {
    				'tab-content': {
    					templateUrl: 'filmes/tab-filme.html',
    					controller: 'FilmeCtrl',
    				},
    			}
    		})

    		.state('tab.horarios', {
    			url: '/horarios/:filmeId',
    			views: {
    				'tab-content': {
    					templateUrl: 'filmes/tab-horarios.html',
    					controller: 'HorariosCtrl',
    				},
    			}
    		});

    		// if none of the above states are matched, use this as the fallback
    		$urlRouterProvider.otherwise('/tab/dash');

    	});

	angular.module('starter.controllers', []);

})();
