var nameClass = TimeSetCommand;
var client = 1.0;

function procCmd(cmd){
	var cmd = cmd.split(" ");
		if(cmd[0] == "time"){
				if(cmd[1] == "set"){
					if(cmd[2] == "day"){
						clientMessage("§bTime set §eDay");
						Level.setTime(0);
						}
						if(cmd[2] == "night"){
							Level.setTime(19000);
							clientMessage("§bTime set §eNight");
							}
						}
					}
}