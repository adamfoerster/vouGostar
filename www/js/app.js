// banco de dados sqlite ficará nesta variável
var db = null;

// variáveis e funções globais
var glb = {
	url: "http://www.omdbapi.com/",
	getUrl: function() {
		return this.url;
	},
	getReq: function(id) {
		return {
			method: 'GET',
			url: this.url,
			headers: {
				'Content-Type': 'application/json',
			},
			params: {
				'i': id,
				'plot': 'short',
				'r': 'json',
			}
		}
	},
	getReqSearch: function(t) {
		return {
			method: 'GET',
			url: this.url,
			headers: {
				'Content-Type': 'application/json',
			},
			params: {
				's': '%' + t + '%',
				'plot': 'short',
				'r': 'json',
				'type': 'movie'
			}
		}
	},
	getEmCartaz: function(){
		return ['tt2005151', 'tt5221584', 'tt1355631', 'tt1386697', 'tt2660888', 'tt5475002', 'tt4160708', 'tt2709768', 'tt1540011'];
	},
}

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, Filmes) {
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
		// db = $cordovaSQLite.openDB("vouGostar.db");
        // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS filmes (id text primary key, titulo text, info text, vai_gostar integer"));

		// salvar todos os filmes que estão no cinema no localStorage
		Filmes.salvarLocal();

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
		templateUrl: 'templates/tabs.html'
	})

	// Each tab has its own nav history stack:
	.state('tab.dash', {
		url: '/dash',
		views: {
			'tab-content': {
				templateUrl: 'templates/tab-dash.html',
				controller: 'DashCtrl',
			},
		}
	})

	.state('tab.account', {
		url: '/account',
		views: {
			'tab-content': {
				templateUrl: 'templates/tab-account.html',
				controller: 'AccountCtrl'
			},
		}
	})

    .state('tab.search', {
		url: '/search',
		views: {
			'tab-content': {
				templateUrl: 'templates/tab-search.html',
				controller: 'SearchCtrl'
			},
		}
	})

	.state('tab.filme', {
		url: '/filme/:filmeId',
		views: {
			'tab-content': {
				templateUrl: 'templates/tab-filme.html',
				controller: 'FilmeCtrl',
			},
		}
	})

	.state('tab.horarios', {
		url: '/horarios/:filmeId',
		views: {
			'tab-content': {
				templateUrl: 'templates/tab-horarios.html',
				controller: 'HorariosCtrl',
			},
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/dash');

});
