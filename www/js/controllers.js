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
	// $scope.init = Trakt.getFilme('Frozen').$$state;
	// console.log($scope.init);
	// $scope.trakt = 'vamo lá';
	$scope.getFilme = function(t) {
		var req = {
			 method: 'GET',
			 url: url ,
			 headers: {
			   'Content-Type': 'application/json',
			 },
			 params: {
				't' : t,
				'plot' : 'short',
				'r' : 'json',
			 }
		}
		var filme;
		return $http(req).then(function successCallback(response){
			// console.log(response.data);
			// export data;
			filme = response.data;
			return response.data;
		});
		// console.log(data)
		return filme;
	}
})

.controller('FilmeCtrl', function($scope, $stateParams, Filmes) {
	$scope.filme = Filmes.get($stateParams.filmeId);
})

.controller('HorariosCtrl', function($scope, $stateParams, Filmes) {
	$scope.filme = Filmes.get($stateParams.filmeId);
})

;
