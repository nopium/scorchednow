var httpServer = require('http').createServer(function(req, response){ /* Serve your static files */ })
httpServer.listen(8080);

var nowjs = require("now");
var everyone = nowjs.initialize(httpServer);

var clientNumber = 0;

everyone.now.players = [];
everyone.now.scene = {"land": {"points": 6 } };
everyone.now.logStuff = function(msg){
    console.log(msg);
    clientNumber++;

    
}


everyone.now.distribute = function(message){
  if (message.type==="login")
  {
   
//    player.tankPosition = Math.floor( Math.random()* everyone.now.tankPoints.length );

    console.log(this.user);

    var tankPosition = Math.floor( Math.random() * (everyone.now.scene.land.points-2) );
    this.user.tankPosition = tankPosition;    
    everyone.now.players[ "_"+this.user.clientId ] = {};
    everyone.now.players[ "_"+this.user.clientId ] = this.user;

    var msg = {"type": "login", "tankPosition": tankPosition};
    everyone.now.receive(this.now.name, msg);
  }
  //var mrXJoinedTheGame = {"title": msg.name};
  //everyone.now.distribute( mrXJoinedTheGame );
  // this.now exposes caller's scope
 // everyone.now.receive(this.now.name, message);
};
