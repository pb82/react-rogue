"use strict";

export const ID = 1;

export const ACCESSIBLE = true;

export var Floor = React.createClass({
    render() {
        var cssClass = this.props.context.type || "";
        return (
            <div className="cell">
                <div className={"block floor " + cssClass}></div>
            </div>
        );
    }
});