"use strict";

export const ID = 999;

export const ACCESSIBLE = true;

export var Player = React.createClass({
    render() {
        return (
            <div className="cell">
                <div className={"block player"}></div>
            </div>
        );
    }
});