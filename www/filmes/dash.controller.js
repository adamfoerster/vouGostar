(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['$scope', 'Filmes', '$ionicSideMenuDelegate', '$http', '$ionicLoading'];

    function DashCtrl($scope, Filmes, $ionicSideMenuDelegate, $http, $ionicLoading){

        carregarFilmesDash();

        // lista os filmes que estão em cartaz
        function carregarFilmesDash(){
            $ionicLoading.show({
                template: 'Carregando...'
            }).then(function(){
                // espera carregar pelo menos todos os filmes em cartaz menos dois
                $scope.carregando = setInterval(function(){

                    // listar todos os filme que a pessoa vai gostar
                    $scope.filmes_vaigostar = Filmes.listar(true);
                    // listar todos os filme que a pessoa não vai gostar
                	$scope.filmes_nvaigostar = Filmes.listar(false);

                    $ionicLoading.hide();
                    // TODO: criar um diretiva para fazer esse redimensionamento dinamicamente
                    // angular.forEach(document.querySelectorAll('.corpo'), function(obj_dom){
                    //     var tam = (document.querySelector('.item').clientWidth - 100) + 'px';
                    //     obj_dom.style.width = tam;
                    //     console.log(tam);
                    // });
                    clearInterval($scope.carregando);

                    $ionicLoading.hide();
                }, 1000);
            });
        }

    	$scope.toggleLeft = function() {
    		$ionicSideMenuDelegate.toggleLeft();
    	};

        // recarrega a lista de filmes ao puxar a lista para baixo
        $scope.doRefresh = function() {
            window.localStorage.clear();

            Filmes.getListaBackend()
                .then(function(data){
                    Filmes.setEmCartaz(data);
                    Filmes.salvarLista(data);
                })
            ;
            carregarFilmesDash();
        };

        // arrumar a largura dos títulos
        // $scope.largura = function (){
        //     let intervalo = setInterval(function(){
        //         // console.log('largura');
        //         let tam = (document.querySelector('.item').clientWidth - 110) + 'px';
        //         let corpos = document.querySelectorAll('.col_titulo');
        //         console.log('corpos:' + corpos.length + 'loaded'+ loaded_qtde);
        //         if (corpos.length == loaded_qtde){
        //             angular.forEach(corpos, function(corpo){
        //                 corpo.style.width = tam;
        //                 console.log(tam);
        //             });
        //             clearInterval(intervalo);
        //         }
        //     },1000);
        // }
        // $scope.largura();
    }

})();
