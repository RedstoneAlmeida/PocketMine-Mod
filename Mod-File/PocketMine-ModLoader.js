var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var blFree = false;

if (typeof com.google.android.gms.ads.AdView == "function")
	blFree = true;

Version = function(str) {
	if (typeof str == "string") {
		var spl = str.split(".");
		this.f = spl[0] - 0;
		this.s = spl[1] - 0;
		this.t = spl[2] - 0;
	} else {
		this.f = 0;
		this.s = 0;
		this.t = 0;
	}
	
	this.setVersion = function(str) {
		var spl = str.split(".");
		this.f = spl[0] - 0;
		this.s = spl[1] - 0;
		this.t = spl[2] - 0;
		return this;
	}
	
	this.getF = function() {
		return this.f;
	}
	
	this.getS = function() {
		return this.s;
	}
	
	this.getT = function() {
		return this.t;
	}
	
	this.smallerThan = function(ver) {
		if (this.f == ver.f && this.s == ver.s && this.t < ver.t)
			return true;
		if (this.f == ver.f && this.s < ver.s)
			return true;
		if (this.f < ver.f)
			return true;
		return false;
	}
	
	this.equalsTo = function(ver) {
		if (this.f == ver.f && this.s == ver.s && this.t == ver.t)
			return true;
		return false;
	}
	
	this.biggerThan = function(ver) {
		if (this.f == ver.f && this.s == ver.s && this.t > ver.t)
			return true;
		if (this.f == ver.f && this.s > ver.s)
			return true;
		if (this.f > ver.f)
			return true;
		return false;
	}
	
	this.toString = function() {
		return this.f + "." + this.s + "." + this.t;
	}
}

var av;
var arb;
var adLoaded = false;

if (blFree) {
	av = new com.google.android.gms.ads.AdView(ctx);
	av.setAdSize(com.google.android.gms.ads.AdSize.BANNER);
	av.setAdUnitId("ca-app-pub-7855255154237193/2825210263");
	arb = new com.google.android.gms.ads.AdRequest.Builder();
}
var cmds = {}

const langs = {
	en:{
		lang:"en", 
		modList:"Mod List",
		descName:"Name", 
		descVer:"Version", 
		descAuth:"Author", 
		descID:"ID", 
		descDesc:"Description", 
		enable:"Enable", 
		disable:"Disable", 
		cantEnable:"This mod cannot be enabled", 
		cantDisable:"This mod cannot be disabled",
		changeLogTitle:"Changelog"
	}, 
	ru:{
		modList:"Список модов",
		descName:"Название", 
		descVer:"Версия", 
		descAuth:"Автор", 
		descID:"ID", 
		descDesc:"Описание", 
		enable:"Включить", 
		disable:"Выключить", 
		cantEnable:"Этот мод нельзя включить", 
		cantDisable:"Этот мод нельзя выключить",
		changeLogTitle:"Список изменений"
	}
}

const lCLs = {
	en:[["Added changelogs", "Added logs", "Added configs", "Removed \".neomod\" mod type", "Again fixed much bugs"]],
	ru:[["Добавлены чейнджлоги", "Добавлены логи", "Добавлены конфиги", "Удалён тип модов \".neomod\"", "Снова пофиксили кучу багов"]]
}

var lang = langs.en;
var CLs = lCLs.en;

if (java.util.Locale.getDefault().getLanguage() == "ru") {
	lang = langs.ru;
	CLs = lCLs.ru;
}

var mods = [];
var configs = [];
var modsBtn = null;
var trees = {}
const MODS_DIR = "/sdcard/games/PocketMineMod/plugins/";
const CONFIG_DIR = "/sdcard/games/PocketMineMod/ModLoader/";
java.io.File(CONFIG_DIR).mkdirs();
const LOGS_DIR = "/sdcard/games/PocketMineMod/logs/";
const MOD_VERSION = "0.6.0 Alpha";
const MOD_VERSIONDEV = "0.6.0";
var LOG_FILE = "";

var allVersions = [];
var allVersionsUpdatenames = [];
allVersions[0] = new Version("0.6.0");
allVersionsUpdatenames[0] = "Big Update !!1!!";

var chLogs = [];
chLogs[allVersions[0]] = CLs[0];

var NML = {
	name:"NML",
	id:"NML",
	Vector3: function(x, y, z) {
		if (x instanceof Number && y instanceof Number && z instanceof Number) {
			this.x = x;
			this.y = y;
			this.z = z;
		} else {
			this.x = 0;
			this.y = 0;
			this.z = 0;
		}
		this.setX = function(x) {
			this.x = x;
			return this
		}
		this.setY = function(y) {
			this.y = y;
			return this
		}
		this.setZ = function(z) {
			this.z = z;
			return this
		}
		this.setCoordinates = function(x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
			return this
		}
		this.getX = function() {
			return this.x
		}
		this.getY = function() {
			return this.y
		}
		this.getZ = function() {
			return this.z
		}
	},
	Block: function() {
		this.material = 1;
		this.opaque = true;
		this.render = 0;
		this.lightLevel = 0;
		this.size = {
			height:1, 
			width:1, 
			length:1, 
			offsetX:0, 
			offsetY:0, 
			offsetZ:0
		}
		this.setID = function(id) {
			this.id = id
			return this;
		}
		this.setName = function(name) {
			this.name = name
			return this;
		}
		this.setTextures = function(textures) {
			this.textures = textures
			return this;
		}
		this.setMaterial = function(material) {
			this.material = material
			return this;
		}
		this.setOpaque = function(opaque) {
			this.opaque = opaque
			return this;
		}
		this.setRender = function(render) {
			this.render = render
			return this;
		}
		this.setLightLevel = function(lightLevel) {
			this.lightLevel = lightLevel;
			return this;
		}
		this.setWidth = function(width) {
			this.size.width = width;
			return this;
		}
		this.setHeight = function(height) {
			this.size.height = height;
			return this;
		}
		this.setLength = function(length) {
			this.size.length = length;
			return this;
		}
		this.setOffsetX = function(offsetX) {
			this.size.offsetX = offsetX;
			return this;
		}
		this.setOffsetY = function(offsetY) {
			this.size.offsetY = offsetY;
			return this;
		}
		this.setOffsetZ = function(offsetZ) {
			this.size.offsetZ = offsetZ;
			return this;
		}
		this.define = function() {
			Block.defineBlock(this.id, this.name, this.textures, this.material, this.opaque, this.render);
			Block.setLightLevel(this.lightLevel);
			Block.setShape(this.id, this.size.offsetX, this.size.offsetY, this.size.offsetZ, this.size.offsetX + this.size.length, this.size.offsetY + this.size.height, this.size.offsetZ + this.size.width);
			return this;
		}
	},
	Tile: function(id, damage) {
		this.linked = false;
		this.coords = new NML.Vector3();
		this.id = id;
		this.damage = damage ? damage : 0;
		this.linkToCoords = function(x, y, z) {
			if (x instanceof NML.Vector3) {
				this.coords = x;
			} else {
				this.coords = new NML.Vector3(x, y, z);
			}
			this.linked = true;
			this.update();
			return this;
		}
		this.unlinkFromCoords = function(x, y, z) {
			this.linked = false;
			return this;
		}
		this.set = function(id, damage) {
			this.id = id;
			this.damage = damage ? damage : 0;
			if (this.linked) {
				this.update();
			}
			return this;
		}
		this.getID = function() {
			if(this.linked) this.updateInstance();
			return this.id;
		}
		this.getDamage = function() {
			if(this.linked) this.updateInstance();
			return this.damage;
		}
		this.update = function() {
			if (!this.linked) {
				throw new org.mozilla.javascript.WrappedException(new java.lang.IllegalStateException("The tile must be linked to the coordinates"));
			}
			Level.setTile(this.coords.getX(), this.coords.getY(), this.coords.getZ(), this.id, this.damage);
			return this;
		}
		this.updateInstance = function() {
			if (!this.linked) {
				throw new org.mozilla.javascript.WrappedException(new java.lang.IllegalStateException("The tile must be linked to the coordinates"));
			}
			this.id = Level.getTile(this.coords.getX(), this.coords.getY(), this.coords.getZ());
			this.damage = Level.getData(this.coords.getX(), this.coords.getY(), this.coords.getZ());
			return this;
		}
	},
	World:{
		name:"NML",
		id:"NML",
		GenerateTree:function(x, y, z, xStart, zStart, tree) {
			var length = tree.length;
			var height = tree[0].length;
			var width = tree[0][0].length;
			xStart -= 1;
			zStart -= 1;
			
			function block(x, y, z, id) {
				(new NML.Tile(id, 0)).linkToCoords(x, y, z);
			}
			
			for (var xT = 0;xT < length;xT++) {
				for (var yT = 0;yT < height;yT++) {
					for (var zT = 0;zT < width;zT++) {
						block(x + xT - xStart, y + yT, z + zT - zStart, tree[xT][yT][zT]);
					}
				}
			}
		}
	},
	Sync:{
		name:"NML",
		id:"NML",
		getAPI:function(modName) {
			if (modName == "NML") {
				return NML;
			}
			var file = findModById(modName);
			if (file == undefined)
				return {};
			var scope = getModScope(file);
			if (scope == undefined)
				return {};
			if (scope.API == undefined)
				return {}
			return scope.API;
		}, 
		getVer:function(modName) {
			if (modName == "NML") {
				return MOD_VERSION;
			}
			var file = findModById(modName);
			if (file == undefined)
				return "";
			var scope = getModScope(file);
			if (scope == undefined)
				return "";
			if (scope.MOD_VERSION == undefined)
				return "";
			return scope.MOD_VERSION;
		}, 
		getVerDev:function(modName) {
			if (modName == "NML") {
				return MOD_VERSIONDEV;
			}
			var file = findModById(modName);
			if (file == undefined)
				return -1;
			var scope = getModScope(file);
			if (scope == undefined)
				return -1;
			if (scope.MOD_VERSIONDEV == undefined)
				return -1;
			return scope.MOD_VERSIONDEV;
		}, 
		isModLoaded:function(modID) {
			for (var i = 0;i < mods.length;i++)
				if (mods[i].modid == modID)
					return true;
			return false;
		}
	}, 
	Game:{
		name:"NML",
		id:"NML",
		RegisterCommand:function(cmd, func) {
			cmds[cmd] = func;
		}
	}, 
	Server:{
		name:"NML",
		id:"NML",
		Server:function() {
			return false;
		}
	}, 
	File:{
		name:"NML",
		id:"NML",
		readFile:function(file) {
			if (typeof file == "string") {
				var source = new java.io.File(file);
				var fis = null;
				var out = "";
				if (!source.exists()) {
					source.createNewFile();
				}
				try {
					fis = new java.io.FileInputStream(source);
				} catch (e) {
					NML.Log.error(e);
				}
				var data = fis.read();
				while(data != -1) {
					out += String.fromCharCode(data);
					data = fis.read();
				}
				fis.close();
				return out;
			}
		},
		writeFile:function(file, text) {
			if (typeof file == "string") {
				var fhandle = new java.io.File(file);
					try {
					//Если нет директорий в пути, то они будут созданы: 
					if (!fhandle.getParentFile().exists())
						fhandle.getParentFile().mkdirs();
					//Если файл существует, то он будет перезаписан: 
					fhandle.createNewFile();
					var fOut = new java.io.FileOutputStream(fhandle);
					var myOutWriter = new java.io.OutputStreamWriter(fOut);
					myOutWriter.write(text);
					myOutWriter.close();
					fOut.close();
				} catch (e) {
					NML.Log.error(e);
				}
			}
		}
	}, 
	Config:{
		name:"NML",
		id:"NML",
		get:function(nm) {
			return configs[this.id][nm];
		}, 
		set:function(nm, val) {
			if (typeof configs[this.id] == "object") {
				configs[this.id][nm] = val;
				Config.save(CONFIG_DIR + this.id + ".cfg", configs[this.id]);
				return true;
			}
			return false;
		}
	},
	print:function(obj) {
		nm = this.name;
		ctx.runOnUiThread(new java.lang.Runnable({
			n:nm,
			run:function() {
				try {
					android.widget.Toast.makeText(ctx, "[" + nm + "]: " + obj, android.widget.Toast.LENGTH_SHORT).show();
				} catch (err) {
					print(err);
				}
			}
		}));
	},
	Log:{
		name:"NML",
		id:"NML",
		info:function(text) {
			NML.File.writeFile(LOG_FILE, NML.File.readFile(LOG_FILE) + "\n[INFO] [" + this.name + "] " + text);
		},
		warning:function(text) {
			NML.File.writeFile(LOG_FILE, NML.File.readFile(LOG_FILE) + "\n[WARNING] [" + this.name + "] " + text);
		},
		error:function(text) {
			NML.File.writeFile(LOG_FILE, NML.File.readFile(LOG_FILE) + "\n[ERROR] [" + this.name + "] " + text);
		}
	},
	destroy:function() {
		findModInstByFile(this.file).disabled = true;
		unloadMod(this.file);
	}
}

java.io.File(LOGS_DIR).mkdirs();
var tr = true;
var i = 0;

var date = java.lang.String.valueOf(android.text.format.DateFormat.format("yyyy-MM-dd_HH.mm.ss", new java.util.Date()))
while (tr) {
	if (java.io.File(LOGS_DIR + date + "-" + i + ".log").exists()) {
		i++;
	} else {
		LOG_FILE = LOGS_DIR + date + "-" + i + ".log";
		tr = false;
	}
}

NML.File.writeFile(LOG_FILE, "[INFO] [NML] Logger initialised");

var fulls;
var modList = new android.app.AlertDialog.Builder(ctx);
modList.setTitle(lang.modList);
if (blFree) {
	modList.setView(av);
}

const NAPI = {
  dip2px:function(ctx, dips){
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
  }
}

var Config = {
	parse:function(file) {
		var out = {}
		var arr = NML.File.readFile(file).split("\n");
		if (arr[0] != "") {
			for (var i = 0;i < arr.length;i++) {
				var pair = arr[i].split("=")
				out[pair[0]] = pair[1];
				if (pair.length > 2) {
					for (var ii = 2;ii < pair.length;ii++)
						out[pair[0]] += "=" + pair[ii];
				}
			}
		}
		return out;
	}, 
	save:function(file, inp) {
		var out = "";
		var fst = false;
		Object.getOwnPropertyNames(inp).forEach(function(val, idx, array) {
			if (fst) {
				out += "\n" + val + "=" + inp[val];
			} else {
				fst = true;
				out += val + "=" + inp[val];
			}
		});
		NML.File.writeFile(file, out);
	}
}

function showChangeLog(oldV) {
	var changeLog = new android.app.AlertDialog.Builder(ctx);
	changeLog.setTitle(lang.changeLogTitle);
	var chLog = "";
	for (var x = 0;x < allVersions.length;x++) {
		if (allVersions[x].biggerThan(oldV)) {
			if (chLog == "") {
				chLog = "---" + allVersions[x].toString() + "(" + allVersionsUpdatenames[x] + ")---";
			} else {
				chLog += "\n\n---" + allVersions[x].toString() + "---";
			}
			for (var i = 0;i < chLogs[allVersions[x]].length;i++) {
				chLog += "\n" + chLogs[allVersions[x]][i];
			}
		}
	}
	var cx = ctx;
	ctx.runOnUiThread(new java.lang.Runnable({
		run:function() {
			var text = new android.widget.TextView(cx);
			text.setText(chLog);
			text.setTextSize(18);
			text.setTextColor(-1);
			text.setGravity(android.view.Gravity.CENTER);
			changeLog.setView(text);
			changeLog.create().show();
		}
	}));
}

configs["NML"] = Config.parse(CONFIG_DIR + "NML.cfg");

if (NML.Config.get("isConfigured") != "true") {
	NML.Log.info("Config not configured, configurating...");
	NML.Config.set("LATEST_VERSION", MOD_VERSIONDEV);
	NML.Config.set("isConfigured", "true");
	showChangeLog(new Version("0.0.0"));
}

var LV = new Version(NML.Config.get("LATEST_VERSION"));
var NV = new Version(MOD_VERSIONDEV);

if (NV.biggerThan(LV)) {
	showChangeLog(LV);
}

NML.Config.set("LATEST_VERSION", MOD_VERSIONDEV);

var stack = {
	stack:[], 
	data:[], 
	add:function(func) {
		var args = Array.prototype.slice.call(arguments);
		args.shift();
		stack.stack.push(func);
		stack.data.push(args);
	}, 
	hasNext:function() {
		return stack.stack.length > 0;
	}, 
	run:function() {
		stack.stack.shift()(stack.data.shift());
	}, 
	runAll:function() {
		while (stack.hasNext()) {
			stack.run();
		}
	}
}

var modsBtnO = {
	hide:function(){
		com.mojang.minecraftpe.MainActivity.currentMainActivity.get().runOnUiThread(new java.lang.Runnable(
			{run:function(){
				if(modsBtn != null){
					modsBtn.dismiss();
					modsBtn = null;
				}
			}}
		));
	},
	show:function(){
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
		//	var picB64Btn = "iVBORw0KGgoAAAANSUhEUgAAAQAAAABDCAMAAABEFysiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURSgmKSgnKlJIUFNJUYaGhpSGgZWHgruwqbyxqtTNyNTOyP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGSzL9wAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAH4SURBVHhe7ZrhbsMgDIRpui5se//3HWedq8oaSRBmSmO+PzlOlhoc40LTtH5F5junNVOH5OOe8voIzLKkNXQC7iUBmTokyz14AlAB0ZdA7CYYvgLCfwugCc4EUIekLIHgTTD6PmA2wcsvgc9twvcALIFr9wA+6RrzNOicgJ8CpWDHe7TGdyPfAqyGKow9gp1A64Ra47vxPgzZCbROqDW+G6kAag/sBFon1Bq/D6u4RjkLZO8lAKw+Smt8NyMqAFh9lNb4bqQCqD2QGResPkprfDelAsInYEgTtFcArdASaG3GA9q+eP8gojdqrwBaoSXQ2owHtH1BAkbsBO0VQCu0BFqb8YC2LyN6wF9XAK3QEmhtxgPavoxaAoqOj/jQQLWY3XAvU+O/doJHfGigWszReB+H7Y3r+IgPDVSLOZrwFXCmBIDXMbRCy5+ZgOgJwIuRmQBqD+zN6rjVt9T8bs68BF6p+d2caR8A7Fip+ftwx1cDFRA6AaUChhyGlNcxtEJLoPWk5g3hv3oAgFZoCbSe1LwhzATMBPgm4O0oCciZDbEKYy9J2Qle/A8SfIg1wi8B7AM8N0JvByogdA/wfjd4PvgQa0gFMDQkcx8QPgHO7wbfjlIBF2+CO8wEzCY4K2A2wdkDqEOCBDxuO6Qrs6SF0xwGP+mc3NIvGCFkidCzk0EAAAAASUVORK5CYII=";
			ctx.runOnUiThread(new java.lang.Runnable({
				run: function() {
					try {
						var layout = new android.widget.RelativeLayout(ctx);
					//	var img = android.util.Base64.decode(picB64Btn, 0);
						var btn = new android.widget.TextView(ctx);
						btn.setText("ModLoader");
						btn.setTextSize(20);
						btn.setTextColor(android.graphics.Color.GRAY);
					//	btn.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(img, 0, img.length));
						btn.setOnClickListener(new android.view.View.OnClickListener({
							onClick: function(view) {
								showModList();
							}
						}));
						layout.addView(btn);
						modsBtn = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
						modsBtn.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
						modsBtn.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER_HORIZONTAL | android.view.Gravity.TOP, NAPI.dip2px(ctx,50), 0);
					} catch (err) {
						print(err);
					}
				}
			}));
	}
}

function showModList() {
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	fulls = [];
	for(i = 0;i < mods.length;i++){
		fulls.push(mods[i].full);
	}
	
	modList.setItems(fulls, new android.content.DialogInterface.OnClickListener() {
		onClick:function(dialog, id) {
			var modDesc = new android.app.AlertDialog.Builder(ctx);
				modDesc.setTitle(mods[id].full);
				var f = "";
				if (mods[id].name != undefined)
					f += lang.descName + ": " + mods[id].name + "\n";
				if (mods[id].ver != undefined)
					f += lang.descVer + ": " + mods[id].ver + "\n";
				if (mods[id].author != undefined)
					f += lang.descAuth + ": " + mods[id].author + "\n";
				if (mods[id].modid != undefined)
					f += lang.descID + ": \"" + mods[id].modid + "\"\n";
				if (mods[id].desc != undefined)
					f += lang.descDesc + ": " + mods[id].desc;
				modDesc.setMessage(f);
				
				
				modDesc.setNegativeButton("", new android.content.DialogInterface.OnClickListener() {
					onClick:function(modDescDlg,bid) {
						// Тут и должно быть пусто, так надо,
						// это сделано специально, чтобы при 
						// нажатии на Disable, не закрывалось 
						// окно. Код ниже ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
						//--UsernameAK
					}
				});
			showModList();
			var modDescDlg = modDesc.create()
			modDescDlg.show();
					if (mods[id].disabled) {
						if (typeof getModVar(mods[id].modid, "enable") == "function") {
							modDescDlg.getButton(android.app.AlertDialog.BUTTON_NEGATIVE).setText(lang.enable);
						} else {
							modDescDlg.getButton(android.app.AlertDialog.BUTTON_NEGATIVE).setText("");//lang.cantEnable);
						}
					} else {
						if (typeof getModVar(mods[id].modid, "disable") == "function") {
							modDescDlg.getButton(android.app.AlertDialog.BUTTON_NEGATIVE).setText(lang.disable);
						} else {
							modDescDlg.getButton(android.app.AlertDialog.BUTTON_NEGATIVE).setText("");//lang.cantDisable);
						}
					}
			modDescDlg.getButton(android.app.AlertDialog.BUTTON_NEGATIVE).setOnClickListener(new android.view.View.OnClickListener() {
				onClick:function() {
					if (mods[id].disabled) {
						var tmp = getModVar(mods[id].modid, "enable");
						if (typeof tmp == "function") {
							mods[id].disabled = false;
							if (typeof getModVar(mods[id].modid, "disable") == "function") {
								modDescDlg.getButton(android.app.AlertDialog.BUTTON_NEGATIVE).setText(lang.disable);
							} else {
								modDescDlg.getButton(android.app.AlertDialog.BUTTON_NEGATIVE).setText("");//lang.cantDisable);
							}
							tmp();
						}
					} else {
						var tmp = getModVar(mods[id].modid, "disable");
						if (typeof tmp == "function") {
							mods[id].disabled = true;
							if (typeof getModVar(mods[id - 1].modid, "enable") == "function") {
								modDescDlg.getButton(android.app.AlertDialog.BUTTON_NEGATIVE).setText(lang.enable);
							} else {
								modDescDlg.getButton(android.app.AlertDialog.BUTTON_NEGATIVE).setText("");//lang.cantEnable);
							}
							tmp();
						}
					}
				}
			});
			
		}
	});
	
	if (blFree) {
		if (adLoaded) {
			modList.setView(null);
		} else {
			av.loadAd(arb.build());
			adLoaded = true;
		}
	}
	modList.create().show();
}

function findModById(prop){
	for(i = 0;i<mods.length;i++){
		if(mods[i].modid != undefined && mods[i].modid == prop){
			return mods[i].file;
		}
	}
	return undefined;
}

function findModInstByFile(file) {
	for(i = 0;i<mods.length;i++){
		if(mods[i].file != undefined && mods[i].file == file){
			return mods[i];
		}
	}
	return undefined;
}

function callMods(func) {
	var args = Array.prototype.slice.call(arguments);
	args.shift();

	net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod(func, args);
}

function callMod(modName, func) {
    var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    var ctx = new org.mozilla.javascript.ContextFactory().enterContext();
	var scope;
    ctx.setOptimizationLevel(-1);
	scope = getModScope(modName);
	var obj = getModVar(modName, func);
	if (obj != null && typeof obj == "function") {
		try {
			var args = Array.prototype.slice.call(arguments);
			args.shift();
			args.shift();
			return (obj).apply(scope, args);
		} catch (e) {
			NML.Log.error(e);
		}
	}
}

function callModN(modName, func) {
    var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    var ctx = new org.mozilla.javascript.ContextFactory().enterContext();
	var scope;
    ctx.setOptimizationLevel(-1);
	scope = getModScope(modName);
	var obj = getModVarN(modName, func);
	if (obj != null && typeof obj == "function") {
		try {
			var args = Array.prototype.slice.call(arguments);
			args.shift();
			args.shift();
			return (obj).apply(scope, args);
		} catch (e) {
			NML.Log.error(e);
		}
	}
}

function loadMod(file) {
	try {
		net.zhuoweizhang.mcpelauncher.ScriptManager.loadScript(new java.io.File(MODS_DIR + file));
    } catch (e) {
		NML.Log.error(e);
    }
}

function unloadMod(file) {
	try {
		net.zhuoweizhang.mcpelauncher.ScriptManager.removeScript(file);
    } catch (e) {
		NML.Log.error(e);
    }
}

function getModScope(modName) {
	var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
	var ctx = new org.mozilla.javascript.ContextFactory().enterContext();
	var scope;
	ctx.setOptimizationLevel(-1);
	for(j = 0;j<scripts.size();j++){
		if(modName == scripts.get(j).name){
			return scripts.get(j).scope;
		}
	}
}

function getModVarN(modName, varName) {
	var scope = getModScope(modName);
	if(scope == undefined) {
		return undefined;
	}
	return scope[varName];
}

function getModVar(modName, varName) {
	if (modName == "NML") {
		return NML[varName];
	}
	var file = findModById(modName);
	if(filenl = undefined){
		return undefined;
	}
	var scope = getModScope(file);
	if(scope == undefined) {
		return undefined;
	}
	return scope[varName];
}

function scan2loadMods(){
	java.io.File(MODS_DIR).mkdirs();
	java.io.File(CONFIG_DIR).mkdirs();
	var allFiles = java.io.File(MODS_DIR).list();
	var modsFiles = [];
	for(i = 0;i<allFiles.length;i++){
		if(/.js$/.test(allFiles[i])){
			modsFiles.push(allFiles[i]);
		}
	}
	
	var file, name, ver, verDev, author, modid, full;
	mods = [];
	configs = [];
	mods[mods.length] = {
		modid:"NML",
		file:"PocketMine-ModLoader.js",
		name:"PocketMine-ModLoader",
		ver:MOD_VERSION,
		verDev:MOD_VERSIONDEV,
		author:"RedstoneAlmeida",
		full:"PocketMine-ModLoader v" + MOD_VERSION,
		desc:"Mod loader",
		disabled:false
	}
	for(i = 0;i<modsFiles.length;i++){
		loadMod(modsFiles[i]);
		file = modsFiles[i];
		modid = getModVarN(file, "MOD_ID");
		name = getModVarN(file, "MOD_NAME");
		ver = getModVarN(file, "MOD_VERSION");
		verDev = getModVarN(file, "MOD_VERSIONDEV");
		author = getModVarN(file, "MOD_AUTHOR");
		desc = getModVarN(file, "MOD_DESC");
		full = "";
		
		if(name != undefined){
			full = name;
			if(ver != undefined){
				full += " v" + ver;
			}
		} else {
			full = file;
			name = file;
		}
		
		mods[mods.length] = {
			modid:modid,
			file:file,
			name:name,
			ver:ver,
			verDev:verDev,
			author:author,
			full:full,
			desc:desc,
			disabled:false
		}
		
		if (typeof modid == "string" && modid != "NML") {
			configs[modid] = Config.parse(CONFIG_DIR + modid + ".cfg");
		}
	}
	
	NML.Log.info("All mods loaded");
}

//Start
scan2loadMods();
modsBtnO.show();

function callModsNML(mode) {
	for (var i = 1;i < mods.length;i++) {
		var newNML = {}
		Object.getOwnPropertyNames(NML).forEach(function(val, idx, array) {
			newNML[val] = NML[val];
			if (typeof newNML[val] == "object") {
				newNML[val].id = mods[i].modid;
				newNML[val].name = mods[i].name;
				newNML[val].file = mods[i].file;
			}
		});
		newNML.id = mods[i].modid;
		newNML.name = mods[i].name;
		newNML.file = mods[i].file;
		callModN(mods[i].file, mode, newNML);
	}
}

callModsNML("initCore");
callModsNML("init");
callModsNML("initAddon");

function procCmd(cmd) {
	cmd = cmd.split(' ');
	if (cmds[cmd[0]] != undefined) {
		var comd = cmds[cmd[0]];
		cmd.shift();
		comd(cmd);
	} else {
		clientMessage(ChatColor.RED + 'Неизвестная команда. Напишите /help для просмотра списка команд');
	}
}

