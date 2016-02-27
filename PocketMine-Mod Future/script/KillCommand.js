var nameClass = KillCommand;
var client = 1.0;

function procCmd(cmd){
	var cmd = cmd.split(" ");
		if(cmd[0] == "kill"){
			Player.setHealth(0);
								}
}