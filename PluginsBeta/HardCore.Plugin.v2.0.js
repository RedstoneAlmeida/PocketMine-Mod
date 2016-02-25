var canWearArmorEntity = [EntityType.ZOMBIE, EntityType.SKELETON];
var armorRandom = Math.floor(Math.random * 3) + 1;

function newLevel(){
    if(Level.getGameMode() != 1){
        Entity.setMaxHealth(getPlayerEnt(), 6);
        if(Entity.getHealth(getPlayerEnt()) > 6){
            Entity.setHealth(getPlayerEnt(), 6);
        }
    }
}

function modTick(){
    if(Level.getGameMode() != 1){
        Entity.setMaxHealth(getPlayerEnt(), 6);
    }
}

functon entityAddedHook(entity){
    for(var i in canWearArmorEntity){
        if(Entity.getEntityTypeId(entity) == canWearArmorEntity[i]){
            switch(armorRandom){
                case 1:
                    Entity.setArmor(entity, 0, 302, 0);
                    Entity.setArmor(entity, 1, 303, 0);
                    Entity.setArmor(entity, 2, 304, 0);
                    Entity.setArmor(entity, 3, 305, 0);
                    break;
                    
                    case 2:
                        Entity.setArmor(entity, 0, 306, 0);
                        Entity.setArmor(entity, 1, 307, 0);
                        Entity.setArmor(entity, 2, 308, 0);
                        Entity.setArmor(entity, 3, 309, 0);
                        break;
                        
                        case 3:
                            Entity.setArmor(entity, 0, 310, 0);
                            Entity.setArmor(entity, 1, 311, 0);
                            Entity.setArmor(entity, 2, 312, 0);
                            Entity.setArmor(entity, 3, 313, 0);
                            break;
            }
        }
    }
}

//More versions are coming soon
