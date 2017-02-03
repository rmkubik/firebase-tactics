var Tactics = Tactics || {};

Tactics.BattleState = function () {
    "use strict";
    Tactics.TiledState.call(this);
};

Tactics.BattleState.prototype = Object.create(Tactics.TiledState.prototype);
Tactics.BattleState.prototype.constructor = Tactics.BattleState;

Tactics.BattleState.prototype.create = function () {
    "use strict";
    var world_grid;

    Tactics.TiledState.prototype.create.call(this);

    this.groups.menu_items.forEach(function (menu_item) {
        this.prefabs.menu.add_item(menu_item);
    }, this);

    this.tile_dimensions = new Phaser.Point(this.map.tileWidth, this.map.tileHeight);
    this.bfs = this.game.plugins.add(Tactics.BreadthFirstSearch, this.map);

    world_grid = this.create_world_grid();
    this.pathfinding = this.game.plugins.add(
      Tactics.Pathfinding,
      world_grid,
      [-1],
      this.tile_dimensions
    );

    this.current_unit = this.prefabs.unit0;
};

Tactics.BattleState.prototype.create_world_grid = function () {
  "use strict";
  var obstacles_layer, row_index, column_index, world_grid;
  obstacles_layer = this.map.layers[1];
  world_grid = [];
  for (row_index = 0; row_index < this.map.height; row_index++) {
    world_grid.push([]);
    for (column_index = 0; column_index < this.map.width; column_index++) {
      world_grid[row_index].push(obstacles_layer.data[row_index][column_index].index);
    }
  }
  return world_grid;
};

Tactics.BattleState.prototype.highlight_regions
  = function (source, radius, region_pool, region_constructor) {
    "use strict";
    var positions, region_name, highlighted_region;
    positions = this.bfs.find_reachable_areas(source, radius);
    positions.forEach(function (position) {
      region_name = "region_" + this.groups[region_pool].countLiving();
      highlighted_region = Tactics.create_prefab_from_pool(
        this.groups[region_pool],
        region_constructor,
        this,
        region_name,
        position,
        {
          texture: "highlighted_region_image",
          group: region_pool
        }
      );
    }, this);
};

Tactics.BattleState.prototype.move = function () {
  "use strict";
  this.highlight_regions(
    this.current_unit.position,
    this.current_unit.stats.walking_radius,
    "move_regions",
    Tactics.MoveRegion.prototype.constructor
  );
};

Tactics.BattleState.prototype.attack = function () {
  "use strict";
  this.highlight_regions(
    this.current_unit.position,
    this.current_unit.stats.attack_range,
    "attack_regions",
    Tactics.HighlightedRegion.prototype.constructor
  );
};

Tactics.BattleState.prototype.wait = function () {

};
