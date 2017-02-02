var Tactics = Tactics || {};

Tactics.BattleState = function () {
    "use strict";
    Tactics.TiledState.call(this);
};

Tactics.BattleState.prototype = Object.create(Tactics.TiledState.prototype);
Tactics.BattleState.prototype.constructor = Tactics.BattleState;

Tactics.BattleState.prototype.create = function () {
    "use strict";
    Tactics.TiledState.prototype.create.call(this);

    this.groups.menu_items.forEach(function (menu_item) {
        this.prefabs.menu.add_item(menu_item);
    }, this);

    this.tile_dimensions = new Phaser.Point(this.map.tileWidth, this.map.tileHeight);
    this.bfs = this.game.plugins.add(Tactics.BreadthFirstSearch, this.map);

    this.current_unit = this.prefabs.unit0;
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
    Tactics.HighlightedRegion.prototype.constructor
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
