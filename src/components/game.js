"use strict"

import C from "./commons";
import Field from "./field";
import Console from "./console";

import { emit } from "./events";

export default React.createClass({
    componentWillMount() {
        this.advance = {
            x: C.advance(this.state.map, "x"),
            y: C.advance(this.state.map, "y")
        };

        document.addEventListener("keydown", this.keyDown);
    },

    componentDidMount() {
        emit("log", {text: "Good luck!", type: "normal"});
        emit("log", {text: "type `h`", type: "help"});
        emit("log", {text: "If you need help, ", type: "normal"});
        emit("log", {text: "Welcome to react-rogue!", type: "normal"});
    },

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDown);
    },

    help() {
        emit("log", {text: "interacted with.", type: "help"});
        emit("log", {text: "Hover items to see if they can be", type: "help"});
        emit("log", {text: "the mouse to interact with things.", type: "help"});
        emit("log", {text: "Use cursor keys to move. Use", type: "help"});
    },

    move(axis, d, text) {
        this.advance[axis](this.state.viewport, d, (err, viewport) => {
            if (!err) {
                emit("log", {text: text, type: "normal"});
                this.setState({
                    viewport: viewport
                });
            } else {
                emit("log", {text: "Oh no! The way is blocked!"});
            }
        });
    },

    keyDown(key) {
        switch(key.keyCode) {
            case 38: return this.move("y", -1, "North");
            case 40: return this.move("y", 1, "South");
            case 37: return this.move("x", -1, "West");
            case 39: return this.move("x", 1, "East");
            case 72: return this.help();
            default: return null;
        }
    },

    getInitialState() {
        return {
            viewport: {
                x: 1,
                y: 1,
                s: 9,
                player: {
                    sight: 5
                }
            },
            map: [
                [{t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}],
                [{t: 1}, {t: 0}, {t: 0}, {t: 1}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 1}],
                [{t: 1}, {t: 0}, {t: 0}, {t: 1}, {t: 1}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 1}],
                [{t: 1}, {t: 3}, {t: 1}, {t: 1}, {t: 1}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 1}],
                [{t: 1}, {t: 0}, {t: 1}, {t: 0}, {t: 1}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 1}],
                [{t: 1}, {t: 0}, {t: 0}, {t: 0}, {t: 1}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 1}],
                [{t: 1}, {t: 0}, {t: 1}, {t: 1}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 1}],
                [{t: 1}, {t: 1}, {t: 1}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 1}],
                [{t: 1}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 1}],
                [{t: 1}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 1}],
                [{t: 1}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 1}],
                [{t: 1}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 0}, {t: 1}],
                [{t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}],
            ]
        }
    },

    render() {
        return (
            <div>
                <Field map={this.state.map} viewport={this.state.viewport} />
                <Console />
            </div>
        );
    }
});