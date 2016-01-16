/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _game = __webpack_require__(1);

	var _game2 = _interopRequireDefault(_game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	ReactDOM.render(React.createElement(_game2.default, null), document.getElementById("app"));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _commons = __webpack_require__(2);

	var _commons2 = _interopRequireDefault(_commons);

	var _field = __webpack_require__(12);

	var _field2 = _interopRequireDefault(_field);

	var _console = __webpack_require__(15);

	var _console2 = _interopRequireDefault(_console);

	var _events = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = React.createClass({
	    displayName: "game",
	    componentWillMount: function componentWillMount() {
	        this.advance = {
	            x: _commons2.default.advance(this.state.map, "x"),
	            y: _commons2.default.advance(this.state.map, "y")
	        };

	        document.addEventListener("keydown", this.keyDown);
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        // Cleanup
	        document.removeEventListener("keydown", this.keyDown);
	    },
	    componentDidMount: function componentDidMount() {
	        // Display a welcome message when the game is loaded
	        (0, _events.emit)("log", { text: "Good luck!", type: "normal" });
	        (0, _events.emit)("log", { text: "type `h`", type: "help" });
	        (0, _events.emit)("log", { text: "If you need help, ", type: "normal" });
	        (0, _events.emit)("log", { text: "Welcome to react-rogue!", type: "normal" });
	    },
	    help: function help() {
	        // Ingame help
	        (0, _events.emit)("log", { text: "interacted with.", type: "help" });
	        (0, _events.emit)("log", { text: "Hover items to see if they can be", type: "help" });
	        (0, _events.emit)("log", { text: "the mouse to interact with things.", type: "help" });
	        (0, _events.emit)("log", { text: "Use cursor keys to move. Use", type: "help" });
	    },

	    /**
	     * Move the player if the position could be advanced.
	     *
	     * @param axis The axis on which to move
	     * @param d The differental value
	     * @param text The text to display in the log of the
	     * movement was successful
	     */
	    move: function move(axis, d, text) {
	        var _this = this;

	        this.advance[axis](this.state.viewport, d, function (err, viewport) {
	            if (!err) {
	                (0, _events.emit)("log", { text: text, type: "normal" });
	                _this.setState({
	                    viewport: viewport
	                });
	                (0, _events.emit)("turn");
	            } else {
	                (0, _events.emit)("log", { text: "Oh no! The way is blocked!" });
	                (0, _events.emit)("turn");
	            }
	        });
	    },

	    /**
	     * Main interaction point. As the game is turn based, nothing will
	     * happen until a key is pressed.
	     *
	     * @param key Key code
	     * @returns {*} Nothing
	     */
	    keyDown: function keyDown(key) {
	        switch (key.keyCode) {
	            case 38:
	                this.move("y", -1, "North");break;
	            case 40:
	                this.move("y", 1, "South");break;
	            case 37:
	                this.move("x", -1, "West");break;
	            case 39:
	                this.move("x", 1, "East");break;
	            case 72:
	                this.help();break;
	            default:
	                break;
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            viewport: {
	                x: 1,
	                y: 1,
	                s: 9,
	                player: {
	                    sight: 5
	                },
	                enemies: [{
	                    x: 10,
	                    y: 10,
	                    id: 998
	                }]
	            },
	            map: [[{ t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }], [{ t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 2 }], [{ t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 2 }], [{ t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 2 }], [{ t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 2 }], [{ t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 2 }], [{ t: 2 }, { t: 1 }, { t: 3 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 2 }], [{ t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 2 }], [{ t: 2 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 2 }], [{ t: 2 }, { t: 1 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 2 }], [{ t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 2 }], [{ t: 2 }, { t: 1 }, { t: 2 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 2 }], [{ t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }, { t: 2 }]]
	        };
	    },
	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(_field2.default, { map: this.state.map, viewport: this.state.viewport }),
	            React.createElement(_console2.default, null)
	        );
	    }
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _index = __webpack_require__(3);

	exports.default = {
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

	    getMask: function getMask(s) {
	        var mask = [];
	        for (var x = 0; x < s; x++) {
	            var row = [];
	            for (var y = 0; y < s; y++) {
	                row.push({ t: _index.Off.ID });
	            }
	            mask.push(row);
	        }
	        return mask;
	    },
	    isEnemyPosition: function isEnemyPosition(viewport, x, y) {
	        for (var i = 0; i < viewport.enemies.length; i++) {
	            var enemy = viewport.enemies[i];
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
	    cropToViewport: function cropToViewport(viewport, map) {
	        // The array containing the cropped region
	        var region = [];

	        // Always rectangular, so x and y are the same
	        var center = Math.floor(viewport.s / 2);

	        // Where to start cropping
	        var fromX = viewport.x - center;
	        var fromY = viewport.y - center;

	        for (var x = fromX; x < fromX + viewport.s; x++) {
	            var row = [];
	            for (var y = fromY; y < fromY + viewport.s; y++) {
	                var enemy = this.isEnemyPosition(viewport, x, y);
	                if (enemy) {
	                    row.push({
	                        t: enemy.id,
	                        enemy: enemy,
	                        playerX: viewport.x,
	                        playerY: viewport.y,
	                        map: map
	                    });
	                } else if (x === viewport.x && y === viewport.y) {
	                    // The players position: draw player sprite
	                    row.push({ t: _index.Player.ID });
	                    continue;
	                } else if (y < 0 || x < 0) {
	                    // Out of bounds (too small)
	                    row.push({ t: _index.Off.ID, visible: false });
	                } else if (map[y] && map[y][x]) {
	                    // Current position is valid and inside the map
	                    var block = map[y][x];

	                    // Add context info to relevant blocks
	                    block.blockX = x;
	                    block.blockY = y;
	                    block.visible = false;
	                    block.playerX = viewport.x;
	                    block.playerY = viewport.y;
	                    block.player = viewport.player;
	                    block.map = map;
	                    row.push(block);
	                } else {
	                    // Out of bounds (too large)
	                    row.push({ t: _index.Off.ID, visible: false });
	                }
	            }
	            region.push(row);
	        }

	        // Hide blocks that are not in sight
	        // var mask = this.getMask(viewport.s);
	        // this.expand(region, mask, center, center, viewport.player.sight);
	        // return mask;
	        return region;
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
	    expand: function expand(r, m, x, y, c) {
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
	        if (r[y] && r[y][x] && (0, _index.accessible)(r[y][x])) {
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
	    advance: function advance(map, axis) {
	        var that = this;

	        if (axis === "x") {
	            // advance on X axis
	            return function (viewport, dx, callback) {
	                if (that.isEnemyPosition(viewport, viewport.x + dx, viewport.y)) {
	                    return callback(true, viewport);
	                }

	                if ((0, _index.accessible)(map[viewport.y][viewport.x + dx])) {
	                    viewport.x += dx;
	                    return callback(null, viewport);
	                } else {
	                    return callback(true, viewport);
	                }
	            };
	        } else {
	            // Advance on Y axis
	            return function (viewport, dy, callback) {
	                if (that.isEnemyPosition(viewport, viewport.x, viewport.y + dy)) {
	                    return callback(true, viewport);
	                }

	                if ((0, _index.accessible)(map[viewport.y + dy][viewport.x])) {
	                    viewport.y += dy;
	                    return callback(null, viewport);
	                } else {
	                    return callback(true, viewport);
	                }
	            };
	        }
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Zombie = exports.Off = exports.Player = exports.Floor = exports.Wall = exports.DoorOpen = exports.Door = undefined;
	exports.accessible = accessible;

	var _door = __webpack_require__(4);

	var _Door = _interopRequireWildcard(_door);

	var _doorOpen = __webpack_require__(5);

	var _DoorOpen = _interopRequireWildcard(_doorOpen);

	var _wall = __webpack_require__(8);

	var _Wall = _interopRequireWildcard(_wall);

	var _floor = __webpack_require__(9);

	var _Floor = _interopRequireWildcard(_floor);

	var _off = __webpack_require__(10);

	var _Off = _interopRequireWildcard(_off);

	var _player = __webpack_require__(11);

	var _Player = _interopRequireWildcard(_player);

	var _zombie = __webpack_require__(17);

	var _Zombie = _interopRequireWildcard(_zombie);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var Door = exports.Door = _Door;
	var DoorOpen = exports.DoorOpen = _DoorOpen;
	var Wall = exports.Wall = _Wall;
	var Floor = exports.Floor = _Floor;
	var Player = exports.Player = _Player;
	var Off = exports.Off = _Off;
	var Zombie = exports.Zombie = _Zombie;

	function accessible(block) {
	    switch (block.t) {
	        case _Door.ID:
	            return _Door.ACCESSIBLE;
	        case _DoorOpen.ID:
	            return _DoorOpen.ACCESSIBLE;
	        case _Wall.ID:
	            return _Wall.ACCESSIBLE;
	        case _Floor.ID:
	            return _Floor.ACCESSIBLE;
	        case _Player.ID:
	            return _Player.ACCESSIBLE;
	        case _Off.ID:
	            return _Off.ACCESSIBLE;
	        case _Zombie.ID:
	            return _Zombie.ACCESSIBLE;
	        default:
	            return false;
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Door = exports.ACCESSIBLE = exports.ID = undefined;

	var _doorOpen = __webpack_require__(5);

	var _algorithms = __webpack_require__(16);

	var _events = __webpack_require__(7);

	var ID = exports.ID = 3;

	var ACCESSIBLE = exports.ACCESSIBLE = false;

	var Door = exports.Door = React.createClass({
	    displayName: "Door",
	    getInitialState: function getInitialState() {
	        return {
	            anim: ""
	        };
	    },

	    mouseDown: function mouseDown() {
	        if ((0, _algorithms.distance)({
	            x: this.props.context.blockX,
	            y: this.props.context.blockY
	        }, {
	            x: this.props.context.playerX,
	            y: this.props.context.playerY
	        }) <= 1) {
	            // A click Opens the door
	            this.props.context.t = _doorOpen.ID;
	            (0, _events.emit)("log", { text: "The old door opens barely...", type: "normal" });
	            (0, _events.emit)("rerender");
	        } else {
	            (0, _events.emit)("log", { text: "Too far away to open it", type: "normal" });
	        }
	    },

	    mouseOver: function mouseOver() {
	        this.setState({ anim: " animated pulse" });
	    },

	    mouseOut: function mouseOut() {
	        this.setState({ anim: "" });
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "cell" },
	            React.createElement("div", {
	                onMouseDown: this.mouseDown,
	                onMouseOver: this.mouseOver,
	                onMouseOut: this.mouseOut,
	                className: "block door" + this.state.anim })
	        );
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DoorOpen = exports.ACCESSIBLE = exports.ID = undefined;

	var _door = __webpack_require__(4);

	var _algorithms = __webpack_require__(16);

	var _events = __webpack_require__(7);

	var ID = exports.ID = 4;

	var ACCESSIBLE = exports.ACCESSIBLE = true;

	var DoorOpen = exports.DoorOpen = React.createClass({
	    displayName: "DoorOpen",
	    getInitialState: function getInitialState() {
	        return {
	            anim: ""
	        };
	    },

	    mouseDown: function mouseDown() {
	        if ((0, _algorithms.distance)({
	            x: this.props.context.blockX,
	            y: this.props.context.blockY
	        }, {
	            x: this.props.context.playerX,
	            y: this.props.context.playerY
	        }) <= 1) {
	            // A click closes the door
	            this.props.context.t = _door.ID;
	            (0, _events.emit)("log", { text: "You manage to close the door", type: "normal" });
	            (0, _events.emit)("rerender");
	        } else {
	            (0, _events.emit)("log", { text: "Too far away to close it", type: "normal" });
	        }
	    },

	    mouseOver: function mouseOver() {
	        this.setState({ anim: " animated pulse" });
	    },

	    mouseOut: function mouseOut() {
	        this.setState({ anim: "" });
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "cell" },
	            React.createElement("div", {
	                onMouseDown: this.mouseDown,
	                onMouseOver: this.mouseOver,
	                onMouseOut: this.mouseOut,
	                className: "block doorOpen" + this.state.anim })
	        );
	    }
	});

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.on = on;
	exports.off = off;
	exports.emit = emit;
	var events = {};

	function on(event, receiver, callback) {
	    if (!events[event]) {
	        events[event] = {};
	    }

	    events[event][receiver] = callback;
	};

	function off(event, receiver) {
	    if (events[event]) {
	        delete events[event][receiver];
	    }
	};

	function emit(event, data) {
	    if (events[event]) {
	        for (var prop in events[event]) {
	            if (!events[event].hasOwnProperty(prop)) {
	                continue;
	            } else {
	                events[event][prop](data);
	            }
	        }
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ID = exports.ID = 2;

	var ACCESSIBLE = exports.ACCESSIBLE = false;

	var Wall = exports.Wall = React.createClass({
	    displayName: "Wall",
	    render: function render() {
	        var cssClass = this.props.context.type || "wall";

	        return React.createElement(
	            "div",
	            { className: "cell" },
	            React.createElement("div", { className: "block " + cssClass })
	        );
	    }
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ID = exports.ID = 1;

	var ACCESSIBLE = exports.ACCESSIBLE = true;

	var Floor = exports.Floor = React.createClass({
	    displayName: "Floor",
	    render: function render() {
	        var cssClass = this.props.context.type || "";
	        return React.createElement(
	            "div",
	            { className: "cell" },
	            React.createElement("div", { className: "block floor " + cssClass })
	        );
	    }
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ID = exports.ID = 0;

	var ACCESSIBLE = exports.ACCESSIBLE = false;

	var Off = exports.Off = React.createClass({
	    displayName: "Off",
	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "cell" },
	            React.createElement("div", { className: "block off" })
	        );
	    }
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ID = exports.ID = 999;

	var ACCESSIBLE = exports.ACCESSIBLE = true;

	var Player = exports.Player = React.createClass({
	    displayName: "Player",
	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "cell" },
	            React.createElement("div", { className: "block player" })
	        );
	    }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _commons = __webpack_require__(2);

	var _commons2 = _interopRequireDefault(_commons);

	var _column = __webpack_require__(13);

	var _column2 = _interopRequireDefault(_column);

	var _events = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = React.createClass({
	    displayName: "field",
	    componentDidMount: function componentDidMount() {
	        var _this = this;

	        (0, _events.on)("rerender", "field", function () {
	            _this.forceUpdate();
	        });
	    },
	    render: function render() {
	        var viewport = _commons2.default.cropToViewport(this.props.viewport, this.props.map);

	        return React.createElement(
	            "div",
	            { className: "field" },
	            viewport.map(function (column, index) {
	                return React.createElement(_column2.default, {
	                    column: column,
	                    index: index,
	                    key: index
	                });
	            })
	        );
	    }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cell = __webpack_require__(14);

	var _cell2 = _interopRequireDefault(_cell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = React.createClass({
	    displayName: "column",
	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "column" },
	            this.props.column.map(function (cell, index) {
	                return React.createElement(_cell2.default, { key: index, cell: cell });
	            })
	        );
	    }
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _index = __webpack_require__(3);

	exports.default = React.createClass({
	    displayName: "cell",
	    render: function render() {
	        var _this = this;

	        return React.createElement(
	            "div",
	            { className: "cell" },
	            (function () {
	                switch (_this.props.cell.t) {
	                    case _index.Off.ID:
	                        return React.createElement(_index.Off.Off, { context: _this.props.cell, parent: _this });
	                    case _index.Floor.ID:
	                        return React.createElement(_index.Floor.Floor, { context: _this.props.cell, parent: _this });
	                    case _index.Wall.ID:
	                        return React.createElement(_index.Wall.Wall, { context: _this.props.cell, parent: _this });
	                    case _index.Player.ID:
	                        return React.createElement(_index.Player.Player, { context: _this.props.cell, parent: _this });
	                    case _index.Door.ID:
	                        return React.createElement(_index.Door.Door, { context: _this.props.cell, parent: _this });
	                    case _index.DoorOpen.ID:
	                        return React.createElement(_index.DoorOpen.DoorOpen, { context: _this.props.cell, parent: _this });
	                    case _index.Zombie.ID:
	                        return React.createElement(_index.Zombie.Zombie, { context: _this.props.cell, parent: _this });
	                    default:
	                        return null;
	                }
	            })()
	        );
	    }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _events = __webpack_require__(7);

	var LOG_SIZE = 4;

	exports.default = React.createClass({
	    displayName: "console",
	    getInitialState: function getInitialState() {
	        return {
	            count: 0,
	            messages: []
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        (0, _events.on)("log", "console", this.log);
	    },
	    log: function log(data) {
	        this.state.messages.push(data);
	        this.state.count++;

	        this.setState({
	            messages: this.state.messages.slice(-LOG_SIZE)
	        });
	    },
	    render: function render() {
	        var _this = this;

	        var messages = [];
	        this.state.messages.forEach(function (message) {
	            messages.push(message);
	        });
	        messages.reverse();

	        return React.createElement(
	            "div",
	            { className: "console" },
	            messages.map(function (message, index) {
	                return React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "span",
	                        { className: "prompt" },
	                        "(" + (_this.state.count - index) + ")>"
	                    ),
	                    React.createElement(
	                        "span",
	                        { className: message.type },
	                        message.text
	                    )
	                );
	            })
	        );
	    }
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AStar = exports.PriorityQueue = undefined;
	exports.distance = distance;

	var _index = __webpack_require__(3);

	var _events = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * The distance between two positions in 2-dimensional space
	 * @param a
	 * @param b
	 */
	function distance(a, b) {
	    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
	};

	/**
	 * A container that holds it's items always sorted by
	 * a `priority` attribute.
	 */

	var PriorityQueue = exports.PriorityQueue = (function () {
	    function PriorityQueue() {
	        _classCallCheck(this, PriorityQueue);

	        this.clear();
	    }

	    /**
	     * Put item into queue. Will be sorted automatically.
	     * @param item The item to put in
	     * @param priority Item priority (smaller is more important)
	     */

	    _createClass(PriorityQueue, [{
	        key: "put",
	        value: function put(item, priority) {
	            this.queue.unshift({ item: item, priority: priority });
	            this.queue.sort(function (a, b) {
	                return a.priority - b.priority;
	            });
	        }

	        /**
	         * Return the most important item and simultaneously remove
	         * it from the queue.
	         * @returns {*}
	         */

	    }, {
	        key: "pop",
	        value: function pop() {
	            var item = this.queue.splice(0, 1);
	            return item[0].item;
	        }
	    }, {
	        key: "empty",
	        value: function empty() {
	            return this.queue.length === 0;
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            this.queue = [];
	        }
	    }]);

	    return PriorityQueue;
	})();

	;

	/**
	 * An implementation of the A* algorithm for finding the
	 * optimal path between two points (if there is one)
	 */

	var _AStar = (function () {
	    function _AStar() {
	        _classCallCheck(this, _AStar);

	        this.frontier = new PriorityQueue();
	    }

	    // Creates a (pseudo) hash for a cell

	    _createClass(_AStar, [{
	        key: "hash",
	        value: function hash(map, cell) {
	            return (cell.y + 1) * map.length + (cell.x + 1);
	        }

	        // Return all accessible neighours of a cell (no diagonal movements
	        // allowed)hhh

	    }, {
	        key: "getNeighbours",
	        value: function getNeighbours(map, cell) {
	            var result = [];

	            if ((0, _index.accessible)(map[cell.y][cell.x - 1])) {
	                result.unshift({ y: cell.y, x: cell.x - 1 });
	            }
	            if ((0, _index.accessible)(map[cell.y][cell.x + 1])) {
	                result.unshift({ y: cell.y, x: cell.x + 1 });
	            }
	            if ((0, _index.accessible)(map[cell.y + 1][cell.x])) {
	                result.unshift({ y: cell.y + 1, x: cell.x });
	            }
	            if ((0, _index.accessible)(map[cell.y - 1][cell.x])) {
	                result.unshift({ y: cell.y - 1, x: cell.x });
	            }

	            return result;
	        }
	    }, {
	        key: "replayPath",
	        value: function replayPath(map, cameFrom, start, goal) {
	            var current = goal;
	            var path = [current];
	            var done = false;

	            while (!done) {
	                if (current.x === start.x && current.y === start.y) {
	                    done = true;
	                } else {
	                    current = cameFrom[this.hash(map, current)];
	                    path.unshift(current);
	                }
	            }

	            return path;
	        }
	    }, {
	        key: "calculatePath",
	        value: function calculatePath(map, start, goal) {
	            var _this = this;

	            var finished = false;
	            this.frontier.put(start, 0);

	            var costSoFar = {};
	            var cameFrom = {};

	            costSoFar[this.hash(map, start)] = 0;

	            var _loop = function _loop() {
	                var current = _this.frontier.pop();

	                if (current.x == goal.x && current.y == goal.y) {
	                    finished = true;
	                } else {
	                    neighbours = _this.getNeighbours(map, current);

	                    neighbours.forEach(function (next) {
	                        var nextId = _this.hash(map, next);
	                        var currentId = _this.hash(map, current);

	                        var newCost = costSoFar[currentId] + 1;

	                        if (costSoFar[nextId] === undefined || newCost < costSoFar[nextId]) {

	                            costSoFar[nextId] = newCost;
	                            var priority = newCost + distance({
	                                x: goal.x, y: goal.y
	                            }, {
	                                x: next.x, y: next.y
	                            });

	                            _this.frontier.put(next, priority);
	                            cameFrom[nextId] = current;
	                        }
	                    });
	                }
	            };

	            while (!this.frontier.empty() && !finished) {
	                var neighbours;

	                _loop();
	            }

	            this.frontier.clear();
	            if (finished) {
	                return this.replayPath(map, cameFrom, start, goal);
	            } else {
	                return null;
	            }
	        }
	    }]);

	    return _AStar;
	})();

	;

	var AStar = exports.AStar = new _AStar();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Zombie = exports.ACCESSIBLE = exports.ID = undefined;

	var _events = __webpack_require__(7);

	var _index = __webpack_require__(3);

	var _algorithms = __webpack_require__(16);

	var ID = exports.ID = 998;

	var ACCESSIBLE = exports.ACCESSIBLE = false;

	var Zombie = exports.Zombie = React.createClass({
	    displayName: "Zombie",
	    getInitialState: function getInitialState() {
	        return {
	            id: Math.floor(Math.random() * 1000000) + ''
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        (0, _events.on)("turn", this.state.id, this.turn);
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        (0, _events.off)("turn", this.state.id);
	    },
	    getDistanceToPlayer: function getDistanceToPlayer() {
	        return (0, _algorithms.distance)({
	            x: this.props.context.enemy.x,
	            y: this.props.context.enemy.y
	        }, {
	            x: this.props.context.playerX,
	            y: this.props.context.playerY
	        });
	    },
	    move: function move(to) {
	        this.props.context.enemy.x = to.x;
	        this.props.context.enemy.y = to.y;
	        (0, _events.emit)("rerender");
	    },
	    turn: function turn() {
	        if (this.getDistanceToPlayer() > 1) {
	            var path = _algorithms.AStar.calculatePath(this.props.context.map, {
	                x: this.props.context.enemy.x,
	                y: this.props.context.enemy.y
	            }, {
	                x: this.props.context.playerX,
	                y: this.props.context.playerY
	            });

	            if (path && path.length >= 2) {
	                this.move(path[1]);
	            }
	        } else {
	            console.log('attack');
	        }
	    },

	    mouseOver: function mouseOver() {
	        this.setState({ anim: " animated pulse" });
	    },

	    mouseOut: function mouseOut() {
	        this.setState({ anim: "" });
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "cell" },
	            React.createElement("div", {
	                onMouseOver: this.mouseOver,
	                onMouseOut: this.mouseOut,
	                className: "block zombie " + this.state.anim
	            })
	        );
	    }
	});

/***/ }
/******/ ]);