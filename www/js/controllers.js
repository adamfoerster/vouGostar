angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Filmes, Globais, $ionicSideMenuDelegate, $http) {
    // listar todos os filme que a pessoa vai gostar e verificar se tem
    // thumbnail e titulo. se não puxa da api
    $scope.filmes_vaigostar = Filmes.listar(true);
    for (var i = 0; i < $scope.filmes_vaigostar.length; i++){
        if ($scope.filmes_vaigostar[i].thumbnail == undefined || $scope.filmes_vaigostar[i].titulo == undefined){
            var req = Globais.getReq($scope.filmes_vaigostar[i].id);
        	$http(req).then(function successCallback(response){
                for (var i = 0; i < $scope.filmes_vaigostar.length; i++) {
                    if ($scope.filmes_vaigostar[i].id == response.data.imdbID){
                        $scope.filmes_vaigostar[i].thumbnail = response.data.Poster;
                        $scope.filmes_vaigostar[i].titulo = response.data.Title;
                    }
                }
        	});
        }
    }
	$scope.filmes_nvaigostar = Filmes.listar(false);
    for (var i = 0; i < $scope.filmes_nvaigostar.length; i++){
        if ($scope.filmes_nvaigostar[i].thumbnail == undefined || $scope.filmes_nvaigostar[i].titulo == undefined){
            var req = Globais.getReq($scope.filmes_nvaigostar[i].id);
        	$http(req).then(function successCallback(response){
                for (var i = 0; i < $scope.filmes_nvaigostar.length; i++) {
                    if ($scope.filmes_nvaigostar[i].id == response.data.imdbID){
                        $scope.filmes_nvaigostar[i].thumbnail = response.data.Poster;
                        $scope.filmes_nvaigostar[i].titulo = response.data.Title;
                    }
                }
        	});
        }
    }
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

.controller('SearchCtrl', function($scope, $http, Globais, Omdb) {
    $scope.carregando = false;
    $scope.msg = '';

    $scope.getFilme = function(titulo) {
        $scope.carregando = true;

        if (titulo.length > 3){
            $http(Globais.getReqSearch(titulo)).then(function successCallback(response){
                $scope.carregando = false;

                if (response.data.Response == "True"){
                    $scope.filmes = response.data.Search;
                } else {
                    $cope.filmes = [];
                    $scope.msg = 'Não encontrei nenhum resultado para ' + document.getElementById('titulo').value;
                    document.getElementById('titulo').value = '';
                    document.getElementById('titulo').focus();
                }
    		});
        }
	};
})

.controller('FilmeCtrl', function($scope, $stateParams, Filmes, Omdb, $http, Globais) {
	// $scope.filme = Filmes.get($stateParams.filmeId);

	var req = {
		 method: 'GET',
		 url: Globais.getUrl() ,
		 headers: {
		   'Content-Type': 'application/json',
		 },
		 params: {
			'i' : $stateParams.filmeId,
			'plot' : 'short',
			'r' : 'json',
		 }
	}
	$http(req).then(function successCallback(response){
		$scope.filme = response.data;
        var local = Filmes.get($scope.filme.imdbID);
        console.log(local);
        if (local.titulo != undefined){
            $scope.filme.Title = local.titulo;
        }
        if (local.info != undefined){
            $scope.filme.Plot = local.info;
        }
        if (local.vaiGostar != undefined){
            $scope.filme.vaiGostar = local.vaiGostar;
        }
        if (local.capa != undefined){
            //$scope.filme.Poster = 'img/' + local.capa;
        }
	});

})

.controller('HorariosCtrl', function($scope, $stateParams, Filmes) {
	$scope.filme = Filmes.get($stateParams.filmeId);
})

;
