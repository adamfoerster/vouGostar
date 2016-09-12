angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

  .factory('Filmes', function(){
    var filmes = [
      {
        id : 1,
        titulo : 'Star Trek Sem Fronteiras',
        thumbnail : 'startrek.jpg',
        vaiGostar : true,
      },
      {
        id : 4,
        titulo : 'Esquadrão Suicida',
        thumbnail : 'suicide.jpg',
        vaiGostar : true,
      },
      {
        id : 5,
        titulo : 'Ben Hur',
        thumbnail : 'benhur.jpg',
        vaiGostar : true,
      },
      {
        id : 2,
        titulo : 'A vida secreta dos bichos',
        thumbnail : 'pets.jpg',
        vaiGostar : false,
      },
      {
        id : 3,
        titulo : 'Um namorado pra minha mulher',
        thumbnail : 'namorado.jpg',
        vaiGostar : false,
      },
    ];

    return {
      listar: function (vaiGostar){
        var retorno = [];
        for (var i = 0; i < filmes.length; i++) {
          console.log(vaiGostar);
          var filme = filmes[i];
          if (filme.vaiGostar == vaiGostar){
            retorno.push(filme);
          }
        }
        return retorno;
      },
      all: function (){
        return filmes;
      },
    }
  });
