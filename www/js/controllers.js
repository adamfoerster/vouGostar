angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Filmes, $ionicSideMenuDelegate) {
	$scope.filmes_vaigostar = Filmes.listar(true);
	$scope.filmes_nvaigostar = Filmes.listar(false);

	$scope.txt_vaigostar = "Você vai gostar!";
	$scope.txt_nvaigostar = "Você vai detestar!";

	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

})

.controller('AccountCtrl', function($scope, Omdb, $http, Globais) {
	$scope.settings = {
		enableFriends: true
	};
    console.log(Globais.getUrl());
	// $scope.init = Trakt.getFilme('Frozen');
	// console.log($scope.init);
	// $scope.trakt = 'vamo lá';
	$scope.getFilme = function(titulo) {
		var req = {
			 method: 'GET',
			 url: Globais.getUrl() ,
			 headers: {
			   'Content-Type': 'application/json',
			 },
			 params: {
				't' : titulo,
				'plot' : 'short',
				'r' : 'json',
			 }
		}
		$http(req).then(function successCallback(response){
			console.log(response.data);
			// export data;
			$scope.filme = response.data;
		});
	}
})

.controller('SearchCtrl', function($scope, Omdb, $http, Globais) {

	$scope.getFilme = function(titulo) {
		var req = {
			 method: 'GET',
			 url: Globais.getUrl() ,
			 headers: {
			   'Content-Type': 'application/json',
			 },
			 params: {
				't' : titulo,
				'plot' : 'short',
				'r' : 'json',
			 }
		}
		$http(req).then(function successCallback(response){
			$scope.filme = response.data;
		});
	}
})

.controller('FilmeCtrl', function($scope, $stateParams, Filmes) {
	$scope.filme = Filmes.get($stateParams.filmeId);
})

.controller('HorariosCtrl', function($scope, $stateParams, Filmes) {
	$scope.filme = Filmes.get($stateParams.filmeId);
})

;
