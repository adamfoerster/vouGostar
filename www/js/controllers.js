angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Filmes, $ionicSideMenuDelegate, $http, $ionicLoading) {
    $ionicLoading.show({
        template: 'Carregando...'
    }).then(function(){
        // espera carregar pelo menos todos os filmes em cartaz menos dois
        $scope.carregando = setInterval(function(){
            if (loaded_qtde >= load_qtde){
                // listar todos os filme que a pessoa vai gostar
                $scope.filmes_vaigostar = Filmes.listar(true);
                // listar todos os filme que a pessoa não vai gostar
            	$scope.filmes_nvaigostar = Filmes.listar(false);
                $ionicLoading.hide();
                clearInterval($scope.carregando);
            }
            $ionicLoading.hide();
        }, 1000);
    });

	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

    $scope.doRefresh = function() {
        window.localStorage.clear();
        $scope.carregando = setInterval(function(){
            if (loaded_qtde >= load_qtde){
                // listar todos os filme que a pessoa vai gostar
                $scope.filmes_vaigostar = Filmes.listar(true);
                // listar todos os filme que a pessoa não vai gostar
            	$scope.filmes_nvaigostar = Filmes.listar(false);
                $scope.$broadcast('scroll.refreshComplete');
                clearInterval($scope.carregando);
            }
        }, 1000);
    };
})

.controller('AccountCtrl', function($scope, Omdb, $http, $cordovaCamera) {
	$scope.settings = {
		enableFriends: true
	};

    $scope.debugar = function() {
        $scope.debug = window.localStorage;
    }

    $scope.limpar = function(){
        window.localStorage.clear();
    }

    $scope.takePicture = function() {
        var options = {
            quality : 100,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 400,
            targetHeight: 400,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
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
            $http(glb.getReqSearch(titulo)).then(function successCallback(response){
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
