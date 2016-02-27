var nameClass = SetSpawnCommand;
var client = 1.0;

function procCmd(cmd){
	var cmd = cmd.split(" ");
		if(cmd[0] == "setspawn"){
				clientMessage("spawn setado em:");
				clientMessage("X: " + Math.round(Player.getX()) + " , Y: " + Math.round(Player.getY()) + " , Z: " + Math.round(Player.getZ()));
		
				var x = getPlayerX();
				var y = getPlayerY();
				var z = getPlayerZ();
		
		Level.setSpawn(x, y, z);
	}
}