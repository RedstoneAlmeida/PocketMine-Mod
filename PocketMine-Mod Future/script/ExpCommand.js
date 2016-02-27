var nameClass = ExpCommand;
var client = 1.0;

function procCmd(cmd){
	var cmd = cmd.split(" ");
		if(cmd[0] == "xp"){
			if(cmd[1] == "1"){
				Player.setLevel(1);
			}
			if(cmd[1] == "15"){
				Player.setLevel(15);
			}
			if(cmd[1] == "30"){
				Player.setLevel(30);
			}
			if(cmd[1] == "infinity"){
				Player.setLevel(3000);
			}
			if(cmd[1] == "clear"){
				Player.setLevel(0);
			}
		}
}