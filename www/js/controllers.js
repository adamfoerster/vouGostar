angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Filmes, $ionicSideMenuDelegate) {
  $scope.filmes_vaigostar = Filmes.listar(true);
  $scope.filmes_nvaigostar = Filmes.listar(false);

  $scope.txt_vaigostar = "Você vai gostar!";
  $scope.txt_nvaigostar = "Você vai detestar!";

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, Trakt) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.init = Trakt.conectar();
  $scope.trakt = 'vamo lá';
})

.controller('FilmeCtrl', function($scope, $stateParams, Filmes) {
  $scope.filme = Filmes.get($stateParams.filmeId);
})

.controller('HorariosCtrl', function($scope, $stateParams, Filmes) {
  $scope.filme = Filmes.get($stateParams.filmeId);
});
