angular
    .module('starter.controllers')
    .controller('DashCtrl', DashCtrl);

DashCtrl.$inject = ['$scope', 'Filmes', '$ionicSideMenuDelegate', '$http', '$ionicLoading'];

function DashCtrl($scope, Filmes, $ionicSideMenuDelegate, $http, $ionicLoading){
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
}
