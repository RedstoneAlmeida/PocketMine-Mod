print("Properties dê PocketMine-Mod carregadas");

var PMRunMod = {};

function newLevel(){
		PMRunMod.saveMainSettings();

}

var settingsPath = android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/PocketMineMod/";
var settingsPathYML = android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/PocketMineMod/";

PMRunMod.saveMainSettings = function() {
    java.io.File(settingsPath).mkdirs();
    var newFile = new java.io.File(settingsPath, "server.properties");
    var newFileYML = new java.io.File(settingsPath, "server.yml");
    newFile.createNewFile();
    newFileYML.createNewFile();
    }
    PMRunMod.loadMainSettings = function() {
    if(!java.io.File(settingsPath + "server.properties").exists())
        return;
    var file = new java.io.File(settingsPath + "server.properties");
}
    PMRunMod.loadMainSettingsYML = function() {
    if(!java.io.File(settingsPath + "server.yml").exists())
        return;
    var file = new java.io.File(settingsPath + "server.yml");
}
