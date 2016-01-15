"use strict";

export const ID = 4;

import { ID as Door } from "./door";
import { distance } from "../vector";
import { emit } from "../events";

export const ACCESSIBLE = true;

export var DoorOpen = React.createClass({
    getInitialState() {
        return {
            anim: ""
        };
    },

    mouseDown: function () {
        if(distance({
                x: this.props.context.blockX,
                y: this.props.context.blockY
            }, {
                x: this.props.context.playerX,
                y: this.props.context.playerY
            }) <= 1) {
            // A click closes the door
            this.props.context.t = Door;
            emit("log", {text: "You manage to close the door", type: "normal"});
            emit("rerender");
        } else {
            emit("log", {text: "Too far away to close it", type: "normal"});
        }
    },

    mouseOver: function () {
        this.setState({anim: " animated pulse"});
    },

    mouseOut: function () {
        this.setState({anim: ""});
    },

    render() {
        return (
            <div className="cell">
                <div
                    onMouseDown={this.mouseDown}
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                    className={"block doorOpen" + this.state.anim}></div>
            </div>
        );
    }
});