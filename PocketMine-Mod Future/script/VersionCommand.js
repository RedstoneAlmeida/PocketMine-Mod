var nameClass = VersionCommand;
var client = 1.0;

function procCmd(cmd){
	var cmd = cmd.split(" ");
		if(cmd[0] == "version"){
			clientMessage("§ePocketMine-Mod Beta 0.3 ○ 0.14.0 ○ by RedstoneAlmeida");
		}
}