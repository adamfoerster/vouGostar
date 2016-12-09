(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('FilmeCtrl', FilmeCtrl);

    FilmeCtrl.$inject = ['$scope', '$stateParams', 'Filmes', '$http', '$ionicLoading', '$ionicPopup'];

    function FilmeCtrl($scope, $stateParams, Filmes, $http, $ionicLoading, $ionicPopup) {

        $ionicLoading.show({
            template: 'Carregando...'
        }).then(function(){
            Filmes
                .get($stateParams.filmeId)
                .then(function(data){
                    $scope.filme = data;
                    $ionicLoading.hide();
                })
                .catch(function(){
                    var alertPopup = $ionicPopup.alert({
                        title: 'Erro na conexão',
                        template: 'Comunicação com o servidor não foi possível'
                    });
                })
            ;
        });

        $scope.gostar = function(filme_id){
            Filmes.gostar(filme_id, 1);
        };

        $scope.detestar = function(filme_id){
            Filmes.gostar(filme_id, 0);
        };
    }

})();
