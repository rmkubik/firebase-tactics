var Tactics = Tactics || {};

Tactics.BreadthFirstSearch = function(game, parent) {
  "use strict";
  Phaser.Plugin.call(this, game, parent);
}

Tactics.BreadthFirstSearch.prototype = Object.create(Phaser.Plugin.prototype);
Tactics.BreadthFirstSearch.prototype.constructor = Tactics.BreadthFirstSearch;

Tactics.BreadthFirstSearch.prototype.init = function(map) {
  "use strict";
  this.map = map;
  this.tile_dimensions = new Phaser.Point(
    this.map.tileWidth,
    this.map.tileHeight
  );
}

Tactics.BreadthFirstSearch.prototype.check_repetition = function (position, array) {
  "use strict";
  var found;
  found = false;
  array.forEach(function(array_position) {
    if (array_position.x === position.x && array_position.y === position.y) {
      found = true;
    }
  }, this);
  return found;
};

Tactics.BreadthFirstSearch.prototype.check_neighbor
  = function (position, positions_to_check, visited_positions) {
    "use strict";
    if (!this.check_repetition(position, positions_to_check)
      && !this.check_repetition(position, visited_positions)
      && !this.map.getTileWorldXY(position.x, position.y,
        this.tile_dimensions.x, this.tile_dimensions.y, "collision")) {
          positions_to_check.push(position);
    }
};

Tactics.BreadthFirstSearch.prototype.add_neighbors
  = function (position, positions_to_check, visited_positions) {
    "use strict";
    var left, right, top, bottom;
    left = new Phaser.Point(position.x - this.tile_dimensions.x, position.y);
    this.check_neighbor(left, positions_to_check, visited_positions);

    right = new Phaser.Point(position.x + this.tile_dimensions.x, position.y);
    this.check_neighbor(right, positions_to_check, visited_positions);

    top = new Phaser.Point(position.x, position.y - this.tile_dimensions.y);
    this.check_neighbor(top, positions_to_check, visited_positions);

    bottom = new Phaser.Point(position.x, position.y + this.tile_dimensions.y);
    this.check_neighbor(bottom, positions_to_check, visited_positions);
};

Tactics.BreadthFirstSearch.prototype.find_reachable_areas
  = function(source_position, radius) {
    "use strict";
    var reachable_positions, positions_to_check, next_position;
    var distance_to_source, highlighted_bitmap, highlighted_region;

    reachable_positions = [source_position];
    positions_to_check = [];
    this.add_neighbors(source_position, positions_to_check, reachable_positions);
    while (positions_to_check.length > 0) {
      next_position = positions_to_check.shift();
      reachable_positions.push(next_position);
      distance_to_source
        = Math.abs(next_position.x - source_position.x) / this.tile_dimensions.x
        + Math.abs(next_position.y - source_position.y) / this.tile_dimensions.y;
      if (distance_to_source < radius) {
        this.add_neighbors(next_position, positions_to_check, reachable_positions);
      }
    }
    return reachable_positions;
}
