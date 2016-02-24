print("SimpleAuth Carregado");

var PMSimpleAuthMod = {};
var passWord = "password";

var register = "Your not is Registred? use §b/register <password>"
var login = "Your is Registred? use §b/login <password>"

function newLevel(){
	clientMessage(register);
	clientMessage(login);
	PMSimpleAuthMod.saveMainSettings();
	playingSong("in.ogg",false);
	

}
function procCmd(cmd){
	var cmd = cmd.split(" ");
	if(cmd[0] == "register"){
		clientMessage("§aRegistred your Account");
		PMSimpleAuthMod.saveMainSettings();
     playingSong("anvil_land.ogg",false);
		
		if(cmd[1] == "password"){
			}
		}
		if(cmd[0] == "login"){
			clientMessage("§aLogin sucessfull");
			PMSimpleAuthMod.loadMainSettings();
       playingSong("anvil_land.ogg",false);
			if(cmd[1] == "password"){
				}
			}
			if(cmd[0] == "simpleauth"){
				if(cmd[1] == "reload"){
					clientMessage("§aReload Config");
					PMSimpleAuthMod.loadMainSettings();
					
					}
				}

}

/* Variaveis */
	
var path = android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/PocketMineMod/plugins/SimpleAuthSounds";

var ply = new android.media.MediaPlayer();

var settingsPath = android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/PocketMineMod/plugins/SimpleAuthMod/";


/* Sons */
	
function playingSong(lagu, ulang) {
ply.stop();
ply.reset();
ply.setDataSource(path + "/" + lagu);
ply.prepare();
ply.setLooping(ulang);
ply.start();
}

function stopSong() {
ply.stop();
ply.reset();
}



/* Ações */

PMSimpleAuthMod.saveMainSettings = function() {
    java.io.File(settingsPath).mkdirs();
    var newFile = new java.io.File(settingsPath, "config.properties");
    var newFileYML = new java.io.File(settingsPath, "accounts.txt");
    newFile.createNewFile();
    newFileYML.createNewFile();
    var outWrite = new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
    outWrite.append("," + passWord.toString());
    }
    
    PMSimpleAuthMod.loadMainSettings = function() {
    if(!java.io.File(settingsPath + "config.properties").exists())
        return;
    var file = new java.io.File(settingsPath + "config.properties");
}

PMSimpleAuthMod.loadMainSettings = function() {
    if(!java.io.File(settingsPath + "accounts.txt").exists())
        return;
    var file = new java.io.File(settingsPath + "accounts.txt");
}

    

