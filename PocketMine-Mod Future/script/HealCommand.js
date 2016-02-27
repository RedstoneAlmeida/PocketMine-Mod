var nameClass = HealCommand;
var client = 1.0;

function procCmd(cmd){
	var cmd = cmd.split(" ");
		if(cmd[0] == "heal"){
			Player.setHealth(20);
			clientMessage("§bHealing your Life");
		}
}