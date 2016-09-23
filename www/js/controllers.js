angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Filmes, $ionicSideMenuDelegate, $http) {
    // listar todos os filme que a pessoa vai gostar e verificar se tem
    // thumbnail e titulo. se não puxa da api
    console.log(window.localStorage);
    $scope.filmes_vaigostar = Filmes.listar(true);

    // listar todos os filme que a pessoa não vai gostar e verificar se tem
    // thumbnail e titulo. se não puxa da api
	$scope.filmes_nvaigostar = Filmes.listar(false);

	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

.controller('AccountCtrl', function($scope, Omdb, $http, $cordovaSQLite) {
	$scope.settings = {
		enableFriends: true
	};
    $scope.insert = function(id, titulo, info, vai_gostar) {
        var query = "INSERT INTO filmes (id, titulo, info, vai_gostar) VALUES (?,?,?,?)";
        $cordovaSQLite.execute(db, query, [id, titulo, info, vai_gostar]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
    }

    $scope.select = function() {
        var query = "SELECT * FROM filmes";
        $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).titulo + " " + res.rows.item(0).info);
            } else {
                console.log("Nenhum resultado encontrado");
            }
        }, function (err) {
            console.error(err);
        });
    }
})

.controller('SearchCtrl', function($scope, $http, Omdb) {
    $scope.carregando = false;
    $scope.msg = '';

    $scope.getPoster = function(img){
        if (img == undefined || img == 'N/A'){
            return 'img/semposter.png';
        } else {
            return img;
        }
    }

    $scope.getFilme = function(titulo) {
        $scope.carregando = true;

        if (titulo.length > 3){
            $http(Globais.getReqSearch(titulo)).then(function successCallback(response){
                $scope.carregando = false;

                if (response.data.Response == "True"){
                    $scope.filmes = response.data.Search;
                } else {
                    $scope.filmes = [];
                    $scope.msg = 'Não encontrei nenhum resultado para ' + document.getElementById('titulo').value;
                    document.getElementById('titulo').value = '';
                    document.getElementById('titulo').focus();
                }
    		});
        }
	};
})

.controller('FilmeCtrl', function($scope, $stateParams, Filmes, Omdb, $http) {
	var req = glb.getReq($stateParams.filmeId);
	$http(req).then(function successCallback(response){
		$scope.filme = response.data;
        var local = Filmes.get($scope.filme.imdbID);
        console.log(local);
        if (local.titulo !== undefined){
            $scope.filme.Title = local.titulo;
        }
        if (local.info !== undefined){
            $scope.filme.Plot = local.info;
        }
        if (local.vaiGostar !== undefined){
            $scope.filme.vaiGostar = local.vaiGostar;
        }
        if (local.capa !== undefined){
            $scope.filme.Poster = 'img/' + local.capa;
        }
	});

})

.controller('HorariosCtrl', function($scope, $stateParams, Filmes) {
	$scope.filme = Filmes.get($stateParams.filmeId);
})

;
