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

    console.log(this.bfs.find_reachable_areas(this.prefabs.unit0.position, 1));
};
