var Tactics = Tactics || {};

var game = new Phaser.Game(240, 240, Phaser.CANVAS);
game.state.add("BootState", new Tactics.BootState());
game.state.add("LoadingState", new Tactics.LoadingState());
game.state.add("BattleState", new Tactics.BattleState());
game.state.start("BootState", true, false, "assets/levels/battle_level.json", "BattleState");