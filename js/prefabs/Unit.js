var Tactics = Tactics || {};

Tactics.Unit = function (game_state, name, position, properties) {
    "use strict";
    Tactics.Prefab.call(this, game_state, name, position, properties);
    
    this.stats = {
        walking_radius: 5,
        attack_range: 1,
        speed: 1,
        attack: 1,
        defense: 1,
        health: 5
    };
    
    this.healthbar = this.game_state.game.add.sprite(this.x, this.y - this.height, "healthbar_image");
    this.healthbar.anchor.setTo(0.5);
    this.healthbar.scale.setTo(this.stats.health, 1);
};

Tactics.Unit.prototype = Object.create(Tactics.Prefab.prototype);
Tactics.Unit.prototype.constructor = Tactics.Unit;