var Tactics = Tactics || {};

Tactics.MoveRegion = function (game_state, name, position, properties) {
  "use strict";
  Tactics.HighlightedRegion.call(this, game_state, name, position, properties);
  console.log(this);

}

Tactics.MoveRegion.prototype = Object.create(Tactics.HighlightedRegion.prototype);
Tactics.MoveRegion.prototype.constructor = Tactics.MoveRegion;

Tactics.MoveRegion.prototype.select = function() {
  "use strict";
  this.game_state.current_unit.move_to(this.position);
}
