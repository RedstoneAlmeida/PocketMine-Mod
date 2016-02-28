var nameClass = PluginCommand;
var client = 1.0;
var plugins = pathPlugins;

function procCmd(cmd){
	var cmd = cmd.split(" ");
		if(cmd[0] == "plugins"){
			clientMessage("§aPocketMine-Mod - §ePlugins");
			clientMessage("§bWorldEdit PE | SimpleAuth");
		}
		if(cmd[0] == "pl"){
			clientMessage("§aPocketMine-Mod - §ePlugins");
			clientMessage("§bWorldEdit PE | SimpleAuth");
		}
}
