(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('FilmeCtrl', FilmeCtrl);

    FilmeCtrl.$inject = ['$scope', '$stateParams', 'Filmes', '$http'];

    function FilmeCtrl($scope, $stateParams, Filmes, $http) {
        let filme = Filmes.get($stateParams.filmeId);
        console.log(filme);
        if (filme.plot != '' || filme.plot != undefined){
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
    }

})();
