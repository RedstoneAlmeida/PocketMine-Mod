var nameClass = GameModeCommand;
var client = 1.0;

function procCmd(cmd){
	var cmd = cmd.split(" ");
	if(cmd[0] == "gamemode"){
		if(cmd[1] == "1"){
			Level.setGameMode(1);
			lientMessage("§bYour Change Gamemode for §l§e1");
		} if(cmd[1] == "0"){
			Level.setGameMode(0);
			lientMessage("§bYour Change Gamemode for §l§e0");
		}
}