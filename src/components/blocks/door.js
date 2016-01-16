"use strict";

import { ID as DoorOpen } from "./doorOpen";
import { distance } from "../algorithms";
import { emit } from "../events";

export const ID = 3;

export const ACCESSIBLE = false;

export var Door = React.createClass({
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
            // A click Opens the door
            this.props.context.t = DoorOpen;
            emit("log", {text: "The old door opens barely...", type: "normal"});
            emit("rerender");
        } else {
            emit("log", {text: "Too far away to open it", type: "normal"});
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
                    className={"block door" + this.state.anim}></div>
            </div>
        );
    }
});