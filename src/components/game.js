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

    componentWillUnmount() {
        // Cleanup
        document.removeEventListener("keydown", this.keyDown);
    },

    componentDidMount() {
        // Display a welcome message when the game is loaded
        emit("log", {text: "Good luck!", type: "normal"});
        emit("log", {text: "type `h`", type: "help"});
        emit("log", {text: "If you need help, ", type: "normal"});
        emit("log", {text: "Welcome to react-rogue!", type: "normal"});
    },

    help() {
        // Ingame help
        emit("log", {text: "interacted with.", type: "help"});
        emit("log", {text: "Hover items to see if they can be", type: "help"});
        emit("log", {text: "the mouse to interact with things.", type: "help"});
        emit("log", {text: "Use cursor keys to move. Use", type: "help"});
    },

    /**
     * Move the player if the position could be advanced.
     *
     * @param axis The axis on which to move
     * @param d The differental value
     * @param text The text to display in the log of the
     * movement was successful
     */
    move(axis, d, text) {
        this.advance[axis](this.state.viewport, d, (err, viewport) => {
            if (!err) {
                emit("log", {text: text, type: "normal"});
                this.setState({
                    viewport: viewport
                });
                emit("turn");
            } else {
                emit("log", {text: "Oh no! The way is blocked!"});
                emit("turn");
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
    keyDown(key) {
        switch(key.keyCode) {
            case 38: this.move("y", -1, "North"); break;
            case 40: this.move("y", 1, "South"); break;
            case 37: this.move("x", -1, "West"); break;
            case 39: this.move("x", 1, "East"); break;
            case 72: this.help(); break;
            default: break;
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
                },
                enemies: [
                    {
                        x: 10,
                        y: 10,
                        id: 998
                    }
                ]
            },
            map: [
                [{t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}],
                [{t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 2}],
                [{t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 2}],
                [{t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 2}],
                [{t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 2}],
                [{t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 2}],
                [{t: 2}, {t: 1}, {t: 3}, {t: 1}, {t: 2}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 2}],
                [{t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 2}],
                [{t: 2}, {t: 1}, {t: 1}, {t: 1}, {t: 2}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 2}],
                [{t: 2}, {t: 1}, {t: 2}, {t: 2}, {t: 2}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 2}],
                [{t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 2}],
                [{t: 2}, {t: 1}, {t: 2}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 1}, {t: 2}],
                [{t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}, {t: 2}],
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