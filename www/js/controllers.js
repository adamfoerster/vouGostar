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
                angular.forEach(document.querySelectorAll('.corpo'), function(obj_dom){
                    var tam = (document.querySelector('.item').clientWidth - 100) + 'px';
                    obj_dom.style.width = tam;
                    console.log(tam);
                });
                clearInterval($scope.carregando);
            }
            $ionicLoading.hide();
        }, 1000);
    });

	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

    $scope.doRefresh = function() {
        loaded_qtde = 0;
        window.localStorage.clear();
        Filmes.salvarLocal();
        $scope.carregando = setInterval(function(){
            if (loaded_qtde >= load_qtde){
                // listar todos os filme que a pessoa vai gostar
                $scope.filmes_vaigostar = Filmes.listar(true);
                // listar todos os filme que a pessoa não vai gostar
            	$scope.filmes_nvaigostar = Filmes.listar(false);
                $scope.$broadcast('scroll.refreshComplete');
                clearInterval($scope.carregando);
                $scope.largura();
            }
        }, 1000);
    };

    // arrumar a largura dos títulos
    $scope.largura = function (){
        let intervalo = setInterval(function(){
            // console.log('largura');
            let tam = (document.querySelector('.item').clientWidth - 110) + 'px';
            let corpos = document.querySelectorAll('.col_titulo');
            console.log('corpos:' + corpos.length + 'loaded'+ loaded_qtde);
            if (corpos.length == loaded_qtde){
                angular.forEach(corpos, function(corpo){
                    corpo.style.width = tam;
                    console.log(tam);
                });
                clearInterval(intervalo);
            }
        },1000);
    }
    $scope.largura();
})

.controller('AccountCtrl', function($scope, $http, $cordovaCamera, Filmes) {
	$scope.filme = {id: ''};
    $scope.debugar = function() {
        console.log($scope.filme.id);
        if ($scope.filme.id != ''){
            let filme = Filmes.get($scope.filme.id);
            if (filme == false){
                $scope.debug = 'Não encontrei esse filme no localStorage';
                $scope.imdbID = '';
            } else {
                $scope.debug = JSON.stringify(filme);
            }
        } else {
            $scope.debug = '';
            keys = Object.keys(window.localStorage);
            i = keys.length;

            while ( i-- ) {
                $scope.debug += 'ID:' + keys[i] + ' - ' + Filmes.get(keys[i]).Title + "<br />";
            }
        }
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

.controller('SearchCtrl', function($scope, $http, Filmes) {
    $scope.carregando = false;
    $scope.msg = '';

    $scope.getFilme = function(titulo) {
        $scope.carregando = true;

        if (titulo.length > 3){
            $http(glb.getReqSearch(titulo)).then(function successCallback(response){
                $scope.carregando = false;
                $scope.filmes = [];
                if (response.data.Response == "True"){
                     let resultados = response.data.Search;
                     for (let i = 0; i < resultados.length; i++){
                         let filme = Filmes.get(resultados[i].imdbID);
                         console.log(filme);
                         if (filme == false){
                             Filmes.set(resultados[i]);
                             filme = Filmes.get(resultados[i].imdbID);
                             console.log('get');
                             console.log(filme);
                         }
                         $scope.filmes.push(filme);
                     }
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

.controller('FilmeCtrl', function($scope, $stateParams, Filmes, $http) {
    let filme = Filmes.get($stateParams.filmeId);
    if (filme.Plot != '' || filme.Plot != undefined){
        $scope.filme = filme;
    } else {
        var req = glb.getReq($stateParams.filmeId);
    	$http(req).then(function successCallback(response){
    		$scope.filme = response.data;
            Filmes.set(response.data);
    	});
    }

    $scope.gostar = function(){
        $scope.filme.gostei = true;
        Filmes.set($scope.filme);
    };

    $scope.detestar = function(){
        $scope.filme.gostei = false;
        Filmes.set($scope.filme);
    };
})

.controller('HorariosCtrl', function($scope, $stateParams, Filmes) {
	$scope.filme = Filmes.get($stateParams.filmeId);
})

;
