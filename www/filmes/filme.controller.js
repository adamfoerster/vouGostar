(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('FilmeCtrl', FilmeCtrl);

    FilmeCtrl.$inject = ['$scope', '$stateParams', 'Filmes', '$http'];

    function FilmeCtrl($scope, $stateParams, Filmes, $http) {
        console.log($stateParams);
        $scope.filme = Filmes.get($stateParams.filmeId);

        $scope.gostar = function(){
            $scope.filme.gostei = true;
            Filmes.set($scope.filme);
        };

        $scope.detestar = function(){
            $scope.filme.gostei = false;
            Filmes.set($scope.filme);
        };
    }

})();
