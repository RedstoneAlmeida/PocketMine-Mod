var selection1 = [0, 0, 0];
var selection2 = [0, 0, 0];
 
var first = false;
var second = false;
 
var activate = true;

function newLevel()
{
}

function procCmd(cmd)
{
var cmd = cmd.split(" ");
if(cmd[0] == "we")
{
clientMessage("§1Type /we on | off");
if(cmd[1] == "on")
{
clientMessage("§2WorldEdit activated!");
activate = true;
}
if(cmd[1] == "off")
{
clientMessage("§2WorldEdit deactivated!");
activate = false;
}
}

if(cmd[0] == "worldedit")
{
clientMessage("How to use:");
clientMessage("Iron Hoe: §2use for selections!");
clientMessage("§buse //set <blockId> <damage>");
clientMessage("§buse //replace <oldBlock> <newBlock> <newBlockDamage>");
clientMessage("§buse /wedit [pos1/pos2/remove]");
clientMessage("§eEx:'//set 57 0' or '//set 57'")
clientMessage("§eEx:'//replace 57 1 0' or '//replace 57 1'");
}

if(cmd[0] == "/set")
{
	var startX = _mathMin(selection1[0], selection2[0]);
	var endX = _mathMax(selection1[0], selection2[0]);
	var startY = _mathMin(selection1[1], selection2[1]);
	var endY = _mathMax(selection1[1], selection2[1]);
	var startZ = _mathMin(selection1[2], selection2[2]);
	var endZ = _mathMax(selection1[2], selection2[2]);
	
	for(var x = startX; x <= endX; x++)
	{
		for(var y = startY; y <= endY; y++)
		{
			for(var z = startZ; z <= endZ; z++)
			{
				setTile(x, y, z, parseInt(cmd[1]), parseInt(cmd[2]));
			}
		}
	}
clientMessage("Set blocks to " + parseInt(cmd[1]) + ":" + parseInt(cmd[2]) + "!");
}

if(cmd[0] == "/replace")
{
	var startX = _mathMin(selection1[0], selection2[0]);
	var endX = _mathMax(selection1[0], selection2[0]);
	var startY = _mathMin(selection1[1], selection2[1]);
	var endY = _mathMax(selection1[1], selection2[1]);
	var startZ = _mathMin(selection1[2], selection2[2]);
	var endZ = _mathMax(selection1[2], selection2[2]);
	
	for(var x = startX; x <= endX; x++)
	{
		for(var y = startY; y <= endY; y++)
		{
			for(var z = startZ; z <= endZ; z++)
			{
				var targetId = getTile(x, y, z);
				if(targetId == parseInt(cmd[1]))
				{
					setTile(x, y, z, parseInt(cmd[2]), parseInt(cmd[3]));
				}
			}
		}
	}
clientMessage("Replaced " + parseInt(cmd[1]) + " with " + parseInt(cmd[2]) + ":" + parseInt(cmd[3]) + "!");
 }
 if(cmd[0] == "wedit"){
 	if(cmd[1] == "pos1"){
 		first = true;
 		selection1[0] = Math.round(x);
			selection1[1] = Math.round(y);
			selection1[2] = Math.round(z);
			clientMessage("§bFirst position set!");
			}
			if(cmd[1] == "pos2"){
				second = true;
				selection2[0] = Math.round(x);
			selection2[1] = Math.round(y);
			selection2[2] = Math.round(z);
			clientMessage("§bSecond position set!");
			clientMessage("§buse §e//set §bfrom set blocks");
			}
			if(cmd[1] == "remove"){
				first = false;
			second = false;
			clientMessage("§eReseting... Please select new positions!");
			}
			}
}

function useItem(x, y, z, item, block, side, itemDamage, blockDamage)
{
	if(item == 292)
	{
if(activate == false)
{
clientMessage("Type '/we on' to activate!");
}
if(activate==true)
{
		if(!first)
		{
			first = true;
			selection1[0] = Math.round(x);
			selection1[1] = Math.round(y);
			selection1[2] = Math.round(z);
			clientMessage("§bFirst position set!");
		}
		else if(!second)
		{
			second = true;
			selection2[0] = Math.round(x);
			selection2[1] = Math.round(y);
			selection2[2] = Math.round(z);
			clientMessage("§bSecond position set!");
		}
		else
		{
			first = false;
			second = false;
			clientMessage("Reseting... Please select new positions!");
		}
	}
}
}
function _mathMin(first, second) {
	return first < second? first : second;
}
 
function _mathMax(first, second) {
	return first > second? first : second;
}
