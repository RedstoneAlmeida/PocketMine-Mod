var nameClass = ExplodeCommand;
var client = 1.0;

function procCmd(cmd){
	var cmd = cmd.split(" ");
		if(cmd[0] == "explode"){
			explode(Player.getX(), Player.getY(), Player.getZ(), 10);
		}
}