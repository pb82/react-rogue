"use strict";

import { on, off, emit } from "../events";
import { Floor } from "./index";
import { AStar, distance } from "../algorithms";

export const ID = 998;

export const ACCESSIBLE = false;

export var Zombie = React.createClass({
    getInitialState() {
        return {
            id: Math.floor(Math.random() * 1000000) + ''
        };
    },

    componentDidMount() {
        on("turn", this.state.id, this.turn);
    },

    componentWillUnmount() {
        off("turn", this.state.id);
    },

    getDistanceToPlayer() {
        return distance({
            x: this.props.context.enemy.x,
            y: this.props.context.enemy.y
        }, {
            x: this.props.context.playerX,
            y: this.props.context.playerY
        });
    },

    move(to) {
        this.props.context.enemy.x = to.x;
        this.props.context.enemy.y = to.y;
        emit("rerender");
    },

    turn() {
        if (this.getDistanceToPlayer() > 1) {
            var path = AStar.calculatePath(this.props.context.map, {
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
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                    className={"block zombie " + this.state.anim}
                ></div>
            </div>
        );
    }
});