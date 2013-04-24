## Drive Chess
### Building the game of kings... with Google Drive


Recently my team has been discussing the potential for using the Google Drive Realtime API as a platform for game development. It seems to offer a number of nice features for game devs:

* User authentication is built-in
* Friends can be invited to play simply by sharing the Drive file
* Users own their game data
* Drive resolves conflicting actions between players
* Storage costs of saved games are effectively zero

As an example, we created a very simple chess program, called Drive Chess, that lets two people (or more) move pieces around a shared chess board. There is no rule enforcement, checkmate detection, or AI player... it’s simply a web-based version of a physical chess board in which any invited player can move any piece.


To play, first authorize the app to use your Google Drive account. Then, invite a friend to play with you by sharing the Drive Chess file with them via the "Invite a Friend" link.

The game stores the position of the pieces in a shared file on each player’s Drive account, and the game itself is on Github, which both hosts the code and provides a public page for the game itself. Combining Drive and Github has a nice side effect of hosting the entire game for free.

We hope this example shows the potential of using Drive for multiplayer turn-based games. To play around with the Realtime API and see how it works for yourself, check out the Realtime Playground. What other game ideas come to mind? One of our team’s favorites is Settlers of Catan. If you’re out there, Klaus Teuber, perhaps you should give it some consideration.

