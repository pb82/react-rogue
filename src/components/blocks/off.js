"use strict";

export const ID = 0;

export const ACCESSIBLE = false;

export var Off = React.createClass({
    render() {
        return (
            <div className="cell">
                <div className={"block off"}></div>
            </div>
        );
    }
});