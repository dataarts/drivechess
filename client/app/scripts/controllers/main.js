'use strict';

angular.module('chessApp')
  .controller('MainCtrl', function($scope, rtclient, $log, $location, debounce) {

    var boardState = {
        'PBa': 'a7',
        'PBb': 'b7',
        'PBc': 'c7',
        'PBd': 'd7',
        'PBe': 'e7',
        'PBf': 'f7',
        'PBg': 'g7',
        'PBh': 'h7',
        'RBa': 'a8',
        'RBh': 'h8',
        'NBb': 'b8',
        'NBg': 'g8',
        'BBc': 'c8',
        'BBf': 'f8',
        'QBd': 'd8',
        'KBe': 'e8',
        'PWa': 'a2',
        'PWb': 'b2',
        'PWc': 'c2',
        'PWd': 'd2',
        'PWe': 'e2',
        'PWf': 'f2',
        'PWg': 'g2',
        'PWh': 'h2',
        'RWa': 'a1',
        'RWh': 'h1',
        'NWb': 'b1',
        'NWg': 'g1',
        'BWc': 'c1',
        'BWf': 'f1',
        'QWd': 'd1',
        'KWe': 'e1'
    };

    var playersState = {
      'whitePlayerID': '',
      'whitePlayerName': '',
      'whitePlayerEmail': '',
      'whitePlayerPhoto': '',
      'blackPlayerID': '',
      'blackPlayerName': '',
      'blackPlayerEmail': '',
      'blackPlayerPhoto': '',
      'turn': 'white'
    }

    var appId = 34208184131;

    function initializeModel(model) {
      $scope.board = model.createMap(boardState);
      model.getRoot().set('board', $scope.board);

      $scope.players = model.createMap(playersState);
      model.getRoot().set('players', $scope.players);
    }

    function onFileLoaded(doc) {
    
      $scope.showBoard = true;
      $scope.board = doc.getModel().getRoot().get('board');
      $scope.players = doc.getModel().getRoot().get('players');

      var collaborators = doc.getCollaborators();
      for ( var i in collaborators ) {
        if ( collaborators[i].isMe ) $scope.me = collaborators[i];
      }

      $scope.$apply();
      $scope.board.addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED, function() {
        $scope.$apply();
      });

      // Set the title and make it renamable
      gapi.client.load('drive', 'v2', function() {
        var request = gapi.client.drive.files.get({
          fileId: rtclient.params['fileId']
        });
        request.execute(function(resp) {
          $scope.title = resp.title;
          window.debounce = debounce;
          $scope.updateTitle = debounce(function() {
            var body = {title: $scope.title};
            var renameRequest = gapi.client.drive.files.patch({
              fileId: rtclient.params['fileId'],
              resource: body
            });
            renameRequest.execute(function(resp) {});
          }, 500);
          $scope.$apply();
        });
      });
    }

    var realtimeOptions = {
      clientId: '34208184131.apps.googleusercontent.com',
      authButtonElementId: 'authorizeButton',
      authNeededCallback: function() {
        $scope.needsAuth = true;
        $scope.$apply();
      },
      initializeModel: initializeModel,
      autoCreate: true,
      defaultTitle: 'Untitled Drive Chess Game',
      onFileLoaded: onFileLoaded
    };

    var realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
    realtimeLoader.start(function() {
      $scope.authorized = true;
      $scope.$apply();
    });

    $scope.flip = function() {
      $('chessboard').toggleClass('black');
    };
    
    $scope.chooseSide = function(color) {
      $scope.players.set(color+'PlayerID', $scope.me.userId);
      $scope.players.set(color+'PlayerName', $scope.me.displayName);
      $scope.players.set(color+'PlayerPhoto', $scope.me.photoUrl);
      if ( color == 'black') $('chessboard').addClass('black');
      if ( color == 'white') $('chessboard').removeClass('black');
    }

    $scope.share = function() { drive.share(rtclient, appId); };
    $scope.open = function() { drive.open(rtclient, appId, realtimeLoader); };
    $scope.create = function() { 
      $scope.showBoard = false;
      realtimeLoader.createNewFileAndRedirect(); 
    };


  });
