(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('FilmeCtrl', FilmeCtrl);

    FilmeCtrl.$inject = ['$scope', '$stateParams', 'Filmes', '$http', '$ionicLoading'];

    function FilmeCtrl($scope, $stateParams, Filmes, $http, $ionicLoading) {

        $ionicLoading.show({
            template: 'Carregando...'
        }).then(function(){
            Filmes
                .get($stateParams.filmeId)
                .then(function(data){
                    $scope.filme = data;
                    $ionicLoading.hide();
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
