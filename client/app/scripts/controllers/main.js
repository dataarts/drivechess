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

    var appId = 34208184131;

    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    function initializeModel(model) {
      $scope.board = model.createMap(boardState);
      model.getRoot().set('board', $scope.board);

      $scope.players = model.createMap();
      model.getRoot().set('players', $scope.players);

      $scope.history = model.createList();
      model.getRoot().set('history', $scope.history);
    }

    function onFileLoaded(doc) {

      $scope.board = doc.getModel().getRoot().get('board');
      $scope.players = doc.getModel().getRoot().get('players');
      $scope.history = doc.getModel().getRoot().get('history');


      var collaborators = doc.getCollaborators();
      for (var i in collaborators) {
        if (collaborators[i].isMe) {
          $scope.me = collaborators[i];
          if ($scope.players.get('blackPlayerID') == $scope.me.userId) {
            $('chessboard').addClass('black');
          }
        }
      }

      var whiteID = $scope.players.get('whitePlayerID');
      var blackID = $scope.players.get('blackPlayerID');

      if ( whiteID && whiteID != $scope.me.userId){
        if (!blackID) $scope.chooseSide('black');
      };

      if ( blackID && blackID != $scope.me.userId){
        if (!whiteID) $scope.chooseSide('white');
      };

      $scope.$apply();
      $scope.board.addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED, function() {
        $scope.$apply();
      });
      $scope.players.addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED, function() {
        $scope.safeApply();
      });
      $scope.history.addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED, function() {
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
        localStorage.setItem('lastGame', rtclient.params['fileId']);
      });

      // store the users email address
      gapi.client.load('oauth2', 'v2', function() {
        var request = gapi.client.oauth2.userinfo.get();
        request.execute(function(resp) {
          $scope.me.email = resp.email;
        });
      });

      $scope.showBoard = true;

    }

    function comment(move, callback) {
      gapi.client.load('drive', 'v2', function() {
        callback = callback || function() {};
        var request = gapi.client.drive.comments.insert({
          fileId: rtclient.params['fileId'],
          resource: {
            content: move || ''
          }
        });
        request.execute(callback);
      });
    }

    function reply(commentId, reply, callback) {
      gapi.client.load('drive', 'v2', function() {
        callback = callback || function() {};
        var request = gapi.client.drive.replies.insert({
          fileId: rtclient.params['fileId'],
          commentId: commentId,
          resource: {
            content: reply
          }
        });
        request.execute(callback);
      });
    }

    $scope.flip = function() {
      $('chessboard').toggleClass('black');
    };

    $scope.chooseSide = function(color) {
      $scope.players.set(color + 'PlayerID', $scope.me.userId);
      $scope.players.set(color + 'PlayerName', $scope.me.displayName);
      $scope.players.set(color + 'PlayerPhoto', $scope.me.photoUrl);
      $scope.players.set(color + 'PlayerEmail', $scope.me.email);
      $scope.players.set($scope.me.userId, color);
      if (color == 'black') $('chessboard').addClass('black');
      if (color == 'white') $('chessboard').removeClass('black');

      var whiteName = $scope.players.get('whitePlayerName');
      var blackName = $scope.players.get('blackPlayerName');
      if (whiteName && blackName && $scope.title == 'Untitled Game') {
        $scope.title = whiteName.split(' ')[0] + ' vs. ' + blackName.split(' ')[0];
        $scope.updateTitle();
      }

      var whiteEmail = $scope.players.get('whitePlayerEmail');
      var blackEmail = $scope.players.get('blackPlayerEmail');
      if (whiteEmail && blackEmail) {
        comment('It is on! +' + whiteName + ' vs +' + blackName + '\n' + document.location.href, function(resp) {
          $scope.players.set('commentId', resp.commentId);
        });
      }
    };

    $scope.share = function() {
      drive.share(rtclient, appId);
      $scope.players.set('invited', true);
    };
    $scope.open = function() { drive.open(rtclient, appId, realtimeLoader); };

    $scope.create = function() {
      $scope.showBoard = false;
      realtimeLoader.createNewFileAndRedirect();
    };

    $scope.$on('move', function(evt, piece, from, to) {
      var commentId = $scope.players.get('commentId');
      if (commentId) {
        var comment = from + ' to ' + to + '\n' + document.location.href;
        console.log(comment);
        reply(commentId, comment);
      }
      $scope.history.push(from + to);
      $scope.$apply();
    });

    var realtimeOptions = {
      clientId: '34208184131.apps.googleusercontent.com',
      authButtonElementId: 'authorizeButton',
      authNeededCallback: function() {
        $scope.needsAuth = true;
        $scope.$apply();
      },
      initializeModel: initializeModel,
      autoCreate: false,
      defaultTitle: 'Untitled Game',
      onFileLoaded: onFileLoaded
    };

    var realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
    realtimeLoader.start(function() {
      $scope.authorized = true;
      $scope.$apply();

      if (!rtclient.params['fileId']){
        var lastGame = localStorage.getItem('lastGame');
        if (lastGame) rtclient.redirectTo(lastGame);
        else $scope.create();
      }

    });

  });