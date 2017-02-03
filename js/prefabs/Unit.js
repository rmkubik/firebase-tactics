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

    this.healthbar
      = this.game_state.game.add.sprite(this.x, this.y - this.height, "healthbar_image");
    this.healthbar.anchor.setTo(0.5);
    this.healthbar.scale.setTo(this.stats.health, 1);
};

Tactics.Unit.prototype = Object.create(Tactics.Prefab.prototype);
Tactics.Unit.prototype.constructor = Tactics.Unit;

Tactics.Unit.prototype.move_to = function(position) {
  "use strict";
  this.game_state.pathfinding.find_path(this.position, position, this.follow_path, this);
}

Tactics.Unit.prototype.follow_path = function(path) {
  "use strict";
  var next_position, moving_tween, healthbar_moving_tween;
  moving_tween = this.game_state.game.tweens.create(this);
  healthbar_moving_tween = this.game_state.game.tweens.create(this.healthbar);
  path.forEach(function(position) {
    moving_tween.to({x: position.x, y: position.y}, Phaser.Timer.SECOND * 0.3);
    healthbar_moving_tween.to({x: position.x, y: position.y - this.height}, Phaser.Timer.SECOND * 0.3);
  }, this);
  moving_tween.start();
  healthbar_moving_tween.start();
}
