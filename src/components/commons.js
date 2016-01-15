"use strict";

import { accessible } from "./blocks/index"

export default {
    getMask() {
        return [
            [{t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}],
            [{t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}],
            [{t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}],
            [{t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}],
            [{t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}],
            [{t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}],
            [{t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}],
            [{t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}],
            [{t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}, {t: -1}]
        ];
    },
    /**
     * Returns an array containing the portion of the level that the
     * character can currently see.
     *
     * @param viewport The current viweport (x, y, s)
     * @param map (The complete map of the level)
     */
    cropToViewport(viewport, map) {
        // The array containing the cropped region
        var region = [];

        // Where to start cropping
        var fromX = viewport.x - Math.floor(viewport.s / 2);
        var fromY = viewport.y - Math.floor(viewport.s / 2);

        for (let x = fromX; x < (fromX + viewport.s); x++) {
            var row = [];
            for (let y = fromY; y < (fromY + viewport.s); y++) {
                // The players position: draw player sprite
                if (x === viewport.x && y === viewport.y) {
                    row.push({t: 2});
                    continue;
                }

                if (y < 0 || x < 0) {
                    // Out of map: too small
                    row.push({t: -1, visible: false});
                } else if (map[y] !==  undefined && map[y][x] !== undefined) {
                    // Inside map. Need to check for 'undefined' because 0 is
                    // valid here (and also evaluates to 'false'
                    var block = map[y][x];

                    // Add context info to relevant blocks
                    block.blockX = x;
                    block.blockY = y;
                    block.visible = false;
                    block.playerX = viewport.x;
                    block.playerY = viewport.y;
                    block.player = viewport.player;
                    row.push(block);
                } else {
                    // Out of map: too large
                    row.push({t: -1, visible: false});
                }
            }
            region.push(row);
        }

        var mask = this.getMask();
        this.expand(region, mask, Math.floor(viewport.s / 2), Math.floor(viewport.s / 2), viewport.player.sight);
        return mask;
    },

    expand(r, m, x, y, c) {
        if (c <= 0 || r[y] === undefined || r[y][x] === undefined || r[y][x].visible) {
            return;
        }

        m[y][x] = r[y][x];
        r[y][x].visible = true;

        if (r[y] !== undefined && r[y][x] !== undefined && accessible(r[y][x])) {
            this.expand(r, m, x + 1, y, c - 1);
            this.expand(r, m, x, y + 1, c - 1);
            this.expand(r, m, x, y - 1, c - 1);
            this.expand(r, m, x - 1, y, c - 1);
        }
    },
    /*
     __getMask: function (w, h) {
     var mask = [];

     for (let x = 0; x < w; x++) {
     var col = [];
     for (let y = 0; y < h; y++) {
     col.push({t: -1});
     }
     mask.push(col);
     }

     return mask;
     },

     __toViewport: function (viewport, map) {
     var view = [];

     var boundsX = Math.floor(viewport.w / 2);
     var boundsY = Math.floor(viewport.h / 2);

     for (let x = 0; x < viewport.w; x++) {
     var row = [];
     for (let y = 0; y < viewport.h; y++) {
     let _y = y + viewport.y - boundsY;
     let _x = x + viewport.x - boundsX;

     if (_x === viewport.x && _y === viewport.y) {
     row.push({t: 2});
     continue;
     }

     if (map[_y] === undefined) {
     row.push({t:-1});
     } else if (map[_y][_x] === undefined) {
     row.push({t:-1});
     } else {
     row.push(map[_y][_x]);
     }
     }
     view.push(row);
     }

     var mask = this.getMask(viewport.w, viewport.h);
     this.expand(view, mask, boundsX, boundsY, 4);

     for (let x = 0; x < viewport.w; x++) {
     for (let y = 0; y < viewport.h; y++) {
     if (mask[y] && mask[y][x].t === -1) {
     view[y][x].t = -1;
     }
     }
     }

     return view;
     },

     __expand: function (map, mask, x, y, tries) {
     if (tries <= 0) return;
     mask[y][x] = map[y][x];

     if (map[y][x].t !== 0 && map[y][x].t !== 2) return;

     if(mask[y][x-1].t === -1) this.expand(map, mask, x - 1, y, tries - 1);
     if(mask[y][x+1].t === -1) this.expand(map, mask, x + 1, y, tries - 1);
     if(mask[y+1] && mask[y+1][x].t === -1) this.expand(map, mask, x, y + 1, tries - 1);
     if(mask[y-1] && mask[y-1][x].t === -1) this.expand(map, mask, x, y - 1, tries - 1);
     }

     */

    advance(map, axis) {
        if (axis === "x") {
            // advance on X axis
            return function (viewport, dx, callback) {
                if (accessible(map[viewport.y][viewport.x + dx])) {
                    viewport.x += dx;
                    return callback(null, viewport);
                } else {
                    return callback(true, viewport);
                }
            }
        } else {
            // Advance on Y axis
            return function (viewport, dy, callback) {
                if (accessible(map[viewport.y + dy][viewport.x])) {
                    viewport.y += dy;
                    return callback(null, viewport);
                } else {
                    return callback(true, viewport);
                }
            }
        }
    }
};