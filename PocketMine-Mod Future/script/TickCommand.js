var nameClass = TickCommand;
var client = 1.0;

function procCmd(cmd){
	var cmd = cmd.split(" ");
		if(cmd[0] == "ticks"){
			if(cmd[1] == "speed"){
				ModPE.setGameSpeed(200);
			}
			if(cmd[1] == "default"){
				ModPE.setGameSpeed(20);
			}
			if(cmd[1] == "slow"){
				ModPE.setGameSpeed(5);
			}
	}
}