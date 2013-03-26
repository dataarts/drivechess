'use strict';

angular.module('chessApp')
  .controller('MainCtrl', function($scope, rtclient) {

    var startState = {
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

    function initializeModel(model) {
      var board = model.createMap(startState);
      model.getRoot().set('board', board);
      $scope.board = board;
    }

    function onFileLoaded(doc) {
      $scope.board = doc.getModel().getRoot().get('board');
      $scope.$apply();
      $scope.board.addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED, function() {
        $scope.$apply();
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
      defaultTitle: 'DriveChess',
      onFileLoaded: onFileLoaded
    };

    var realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
    realtimeLoader.start(function() {
      $scope.authorized = true;
    });

  });
