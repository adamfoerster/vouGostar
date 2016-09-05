angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.filmes = [
    {
      id : 1,
      titulo : 'Star Trek Sem Fronteiras',
      thumbnail : 'startrek.jpg',
      vaigostar : true,
    },
    {
      id : 2,
      titulo : 'A vida secreta dos bichos',
      thumbnail : 'pets.jpg',
      vaigostar : false,
    },
    {
      id : 3,
      titulo : 'Um namorado pra minha mulher',
      thumbnail : 'namorado.jpg',
      vaigostar : false,
    },
    {
      id : 4,
      titulo : 'Esquadrão Suicida',
      thumbnail : 'suicide.jpg',
      vaigostar : true,
    },
    {
      id : 5,
      titulo : 'Ben Hur',
      thumbnail : 'benhur.jpg',
      vaigostar : true,
    },
  ];
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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
