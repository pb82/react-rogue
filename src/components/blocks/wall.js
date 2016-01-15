"use strict";

export const ID = 1;

export const ACCESSIBLE = false;

export var Wall = React.createClass({
    render() {
        return (
            <div className="cell">
                <div className={"block wall"}></div>
            </div>
        );
    }
});