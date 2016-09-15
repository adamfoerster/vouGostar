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

.controller('AccountCtrl', function($scope, Trakt) {
	$scope.settings = {
		enableFriends: true
	};

	$scope.init = Trakt.conectar();
	$scope.trakt = 'vamo lá';
})

.controller('FilmeCtrl', function($scope, $stateParams, Filmes) {
	$scope.filme = Filmes.get($stateParams.filmeId);
})

.controller('HorariosCtrl', function($scope, $stateParams, Filmes) {
	$scope.filme = Filmes.get($stateParams.filmeId);
});
