function newLevel(){
    if(Level.getGameMode() != 1){
        Entity.setMaxHealth(getPlayerEnt(), 6);
        if(Entity.getHealth(getPlayerEnt()) > 6){
            Entity.setHealth(getPlayerEnt(), 6);
            Level.setGameMode(0);
        }
    }
}
