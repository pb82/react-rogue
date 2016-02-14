"use strict";

import * as React from "react";
import { distance } from "../algorithms";
import Pulse from "../mixins/pulse";
import { dispatch } from "../../flux/store";

export const ID = 3;

export const ACCESSIBLE = false;

export const Door = React.createClass({
    mixins: [Pulse],

    mouseDown: function () {
        let x = this.props.context.blockX;
        let y = this.props.context.blockY;

        let pX = this.props.context.playerX;
        let pY = this.props.context.playerY;

        if(distance({x, y}, {
            x: pX,
            y: pY
        }) <= 1) {
            dispatch({type: "TOGGLE_DOOR", x, y});
        } else {
            dispatch({type: "LOG", text: "Too far away to open it", style: "normal"});
        }
    },

    render() {
        let cssClass = this.props.context.a ? "doorOpen" : "door";

        return (
            <div className="cell">
                <div
                    onMouseDown={this.mouseDown}
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                    className={`block ${cssClass} ${this.state.anim}`}></div>
            </div>
        );
    }
});