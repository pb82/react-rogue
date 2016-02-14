"use strict";

export default {
    /**
     * Return a mask that is used to expand the field
     * of view on. Initially the mask contains only `Off`
     * fields and data from the viewport is copied as the
     * field of view expands from the players position.
     *
     * We have to create a fresh mask for every turn since
     * objects are stored as references and the mask would
     * remember it's old values otherwise.
     *
     * @param s Size of the map (rectangular)
     * @returns {Array} The mask
     */
    getMask(s) {
        var mask = [];
        for (let x = 0; x < s; x++) {
            let row = [];
            for (let y = 0; y < s; y++) {
                row.push({t: 0});
            }
            mask.push(row);
        }
        return mask;
    },

    isEnemyPosition(x, y, enemies) {
        for (let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];
            if (enemy.x === x && enemy.y === y) {
                return enemy;
            }
        }

        return false;
    },

    /**
     * Returns an array containing the portion of the level that the
     * character can currently see.
     *
     * @param viewport The current viweport (x, y, s)
     * @param map (The complete map of the level)
     */
    cropToViewport(viewport, map, player, enemies) {
        // The array containing the cropped region
        let region = [];

        // Always rectangular, so x and y are the same
        let center = Math.floor(viewport.s / 2);

        // Where to start cropping
        let fromX = viewport.x - center;
        let fromY = viewport.y - center;

        for (let x = fromX; x < (fromX + viewport.s); x++) {
            var row = [];
            for (let y = fromY; y < (fromY + viewport.s); y++) {
                var enemy = this.isEnemyPosition(x, y, enemies);
                if (enemy) {
                    row.push({
                        t: enemy.id,
                        a: false,
                        enemy: enemy,
                        playerX: viewport.x,
                        playerY: viewport.y,
                        map: map
                    });
                } else if (x === viewport.x && y === viewport.y) {
                    // The players position: draw player sprite
                    row.push({t: 999, a: true});
                    continue;
                } else if (y < 0 || x < 0) {
                    // Out of bounds (too small)
                    row.push({t: 0, visible: false, a: false});
                } else if (map[y] && map[y][x]) {
                    // Current position is valid and inside the map
                    var block = map[y][x];

                    // Add context info to relevant blocks
                    block.blockX = x;
                    block.blockY = y;
                    block.visible = false;
                    block.playerX = viewport.x;
                    block.playerY = viewport.y;
                    block.map = map;
                    row.push(block);
                } else {
                    // Out of bounds (too large)
                    row.push({t: 0, visible: false});
                }
            }
            region.push(row);
        }

        // Hide blocks that are not in sight
        var mask = this.getMask(viewport.s);
        this.expand(region, mask, center, center, player.sight);
        return mask;
    },

    /**
     * Expands the field of view for `c` cycles, copying the blocks
     * from `r` to `m`. The expansion usually starts in the middle
     * of the region (where the player is positioned)
     * @param r Region
     * @param m Mask
     * @param x expansion start X
     * @param y expansion start Y
     * @param c Cycles to go
     */
    expand(r, m, x, y, c) {
        // Exit condition. Exit if either
        // cycles === 0 (end of sight)
        // or current position out-of-map
        // or the field has been visited already
        if (c <= 0 || !r[y] || !r[y][x] || r[y][x].visible) {
            return;
        }

        // Copy from viewport to mask and mark the field as
        // already visited
        m[y][x] = r[y][x];
        r[y][x].visible = true;

        // Expand recursively on accessible neighbours
        if (r[y] && r[y][x] && r[y][x].a) {
            this.expand(r, m, x + 1, y, c - 1);
            this.expand(r, m, x, y + 1, c - 1);
            this.expand(r, m, x, y - 1, c - 1);
            this.expand(r, m, x - 1, y, c - 1);
        }
    },

    /**
     * Create advance functions. An advance function will increment
     * the position of the player in the viewport if the next field
     * is accessible. Otherwise the old viewport is returned.
     *
     * @param map The complete map
     * @param axis The axis on which to adcanve
     * @returns {Function} A callback that is invoked with the
     * next viewport. The first argument indicates if the viewport
     * could be advanced.
     */
    advance(map, axis) {
        var that = this;

        if (axis === "x") {
            // advance on X axis
            return function (viewport, dx, enemies, callback) {
                if (that.isEnemyPosition(viewport.x+dx, viewport.y, enemies)) {
                    return callback(true, viewport);
                }

                if (map[viewport.y][viewport.x + dx].a) {
                    viewport.x += dx;
                    return callback(null, viewport);
                } else {
                    return callback(true, viewport);
                }
            }
        } else {
            // Advance on Y axis
            return function (viewport, dy, enemies, callback) {
                if (that.isEnemyPosition(viewport.x, viewport.y+dy, enemies)) {
                    return callback(true, viewport);
                }

                if (map[viewport.y + dy][viewport.x].a) {
                    viewport.y += dy;
                    return callback(null, viewport);
                } else {
                    return callback(true, viewport);
                }
            }
        }
    }
};