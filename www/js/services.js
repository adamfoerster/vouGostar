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
        capa : 'capa_startrek.jpg',
        vaiGostar : true,
        info: "Star Trek Beyond é um filme norte-americano de 2016 dirigido por Justin Lin e escrito por Simon Pegg e Doug Jung. É o décimo terceiro longa-metragem da franquia Star Trek e o terceiro estrelado pelo novo elenco na série reboot. Na história, a tripulação da USS Enterprise é atacada e presa por uma espécia alienígena desconhecida, precisando encontrar um modo de fugir e enfrentar um inimigo que odeia a Federação dos Planetas Unidos.",
        horarios: [
            {
                cinema: 'UCI Palladium',
                sessoes: "<b>Sala 2</b><br />* Quinta a quarta (legendado): 21h40<br /><b>Preço:</b><br/>* Segunda e terça: R$ 20 (até 17h) <br/>* Segunda e terça: R$ 22 (após 17h)<br />* Quarta: R$ 19<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 24 (até 17h)<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 27 (após 17h) ",
            },
            {
                cinema: 'IMAX Palladium',
                sessoes: "<b>Sala 2</b><br />* Quinta a quarta (legendado): 21h40<br /><b>Preço:</b><br/>* Segunda e terça: R$ 20 (até 17h) <br/>* Segunda e terça: R$ 22 (após 17h)<br />* Quarta: R$ 19<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 24 (até 17h)<br/>* Quinta, sexta, sábado, domingo e feriado: R$ 27 (após 17h) ",
            },
        ],
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
          var filme = filmes[i];
          if (filme.vaiGostar == vaiGostar){
            retorno.push(filme);
          }
        }
        return retorno;
      },
      get: function (filmeId){
          var retorno = [];
          for (var i = 0; i < filmes.length; i++) {
            var filme = filmes[i];
            if (filme.id == filmeId){
              return filme;
            }
          }
      },
      all: function (){
          return filmes;
      },
    }
  });
