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
	    componentDidMount: function componentDidMount() {
	        (0, _events.emit)("log", { text: "Good luck!", type: "normal" });
	        (0, _events.emit)("log", { text: "type `h`", type: "help" });
	        (0, _events.emit)("log", { text: "If you need help, ", type: "normal" });
	        (0, _events.emit)("log", { text: "Welcome to react-rogue!", type: "normal" });
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        document.removeEventListener("keydown", this.keyDown);
	    },
	    help: function help() {
	        (0, _events.emit)("log", { text: "interacted with.", type: "help" });
	        (0, _events.emit)("log", { text: "Hover items to see if they can be", type: "help" });
	        (0, _events.emit)("log", { text: "the mouse to interact with things.", type: "help" });
	        (0, _events.emit)("log", { text: "Use cursor keys to move. Use", type: "help" });
	    },
	    move: function move(axis, d, text) {
	        var _this = this;

	        this.advance[axis](this.state.viewport, d, function (err, viewport) {
	            if (!err) {
	                (0, _events.emit)("log", { text: text, type: "normal" });
	                _this.setState({
	                    viewport: viewport
	                });
	            } else {
	                (0, _events.emit)("log", { text: "Oh no! The way is blocked!" });
	            }
	        });
	    },
	    keyDown: function keyDown(key) {
	        switch (key.keyCode) {
	            case 38:
	                return this.move("y", -1, "North");
	            case 40:
	                return this.move("y", 1, "South");
	            case 37:
	                return this.move("x", -1, "West");
	            case 39:
	                return this.move("x", 1, "East");
	            case 72:
	                return this.help();
	            default:
	                return null;
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
	                }
	            },
	            map: [[{ t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }], [{ t: 1 }, { t: 0 }, { t: 0 }, { t: 1 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 1 }], [{ t: 1 }, { t: 0 }, { t: 0 }, { t: 1 }, { t: 1 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 1 }], [{ t: 1 }, { t: 3 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 1 }], [{ t: 1 }, { t: 0 }, { t: 1 }, { t: 0 }, { t: 1 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 1 }], [{ t: 1 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 1 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 1 }], [{ t: 1 }, { t: 0 }, { t: 1 }, { t: 1 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 1 }], [{ t: 1 }, { t: 1 }, { t: 1 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 1 }], [{ t: 1 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 1 }], [{ t: 1 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 1 }], [{ t: 1 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 1 }], [{ t: 1 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 0 }, { t: 1 }], [{ t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }, { t: 1 }]]
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
	    getMask: function getMask() {
	        return [[{ t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }], [{ t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }], [{ t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }], [{ t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }], [{ t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }], [{ t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }], [{ t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }], [{ t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }], [{ t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }, { t: -1 }]];
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

	        // Where to start cropping
	        var fromX = viewport.x - Math.floor(viewport.s / 2);
	        var fromY = viewport.y - Math.floor(viewport.s / 2);

	        for (var x = fromX; x < fromX + viewport.s; x++) {
	            var row = [];
	            for (var y = fromY; y < fromY + viewport.s; y++) {
	                // The players position: draw player sprite
	                if (x === viewport.x && y === viewport.y) {
	                    row.push({ t: 2 });
	                    continue;
	                }

	                if (y < 0 || x < 0) {
	                    // Out of map: too small
	                    row.push({ t: -1, visible: false });
	                } else if (map[y] !== undefined && map[y][x] !== undefined) {
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
	                    row.push({ t: -1, visible: false });
	                }
	            }
	            region.push(row);
	        }

	        var mask = this.getMask();
	        this.expand(region, mask, Math.floor(viewport.s / 2), Math.floor(viewport.s / 2), viewport.player.sight);
	        return mask;
	    },
	    expand: function expand(r, m, x, y, c) {
	        if (c <= 0 || r[y] === undefined || r[y][x] === undefined || r[y][x].visible) {
	            return;
	        }

	        m[y][x] = r[y][x];
	        r[y][x].visible = true;

	        if (r[y] !== undefined && r[y][x] !== undefined && (0, _index.accessible)(r[y][x])) {
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

	    advance: function advance(map, axis) {
	        if (axis === "x") {
	            // advance on X axis
	            return function (viewport, dx, callback) {
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
	exports.Off = exports.Player = exports.Floor = exports.Wall = exports.DoorOpen = exports.Door = undefined;
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

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var Door = exports.Door = _Door;
	var DoorOpen = exports.DoorOpen = _DoorOpen;
	var Wall = exports.Wall = _Wall;
	var Floor = exports.Floor = _Floor;
	var Player = exports.Player = _Player;
	var Off = exports.Off = _Off;

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

	var _vector = __webpack_require__(6);

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
	        if ((0, _vector.distance)({
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

	var _vector = __webpack_require__(6);

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
	        if ((0, _vector.distance)({
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
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.distance = distance;
	/**
	 * The distance between two positions in 2-dimensional space
	 * @param a
	 * @param b
	 */
	function distance(a, b) {
	  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.on = on;
	exports.emit = emit;
	var events = {};

	function on(event, callback) {
	    events[event] = callback;
	};

	function emit(event, data) {
	    if (events[event]) {
	        events[event](data);
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ID = exports.ID = 1;

	var ACCESSIBLE = exports.ACCESSIBLE = false;

	var Wall = exports.Wall = React.createClass({
	    displayName: "Wall",
	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "cell" },
	            React.createElement("div", { className: "block wall" })
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
	var ID = exports.ID = 0;

	var ACCESSIBLE = exports.ACCESSIBLE = true;

	var Floor = exports.Floor = React.createClass({
	    displayName: "Floor",
	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "cell" },
	            React.createElement("div", { className: "block floor" })
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
	var ID = exports.ID = -1;

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
	var ID = exports.ID = 2;

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

	        (0, _events.on)("rerender", function () {
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
	        (0, _events.on)("log", this.log);
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

/***/ }
/******/ ]);