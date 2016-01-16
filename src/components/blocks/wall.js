"use strict";

export const ID = 2;

export const ACCESSIBLE = false;

export var Wall = React.createClass({
    render() {
        var cssClass = this.props.context.type || "wall";

        return (
            <div className="cell">
                <div className={"block " + cssClass}></div>
            </div>
        );
    }
});