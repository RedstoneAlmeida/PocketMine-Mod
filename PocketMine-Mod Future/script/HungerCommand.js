var nameClass = HungerCommand;
var client = 1.0;

function procCmd(cmd){
	var cmd = cmd.split(" ");
		if(cmd[0] == "hunger"){
			Player.setHunger(20);
		}
}