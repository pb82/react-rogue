"use strict";

import Cell from "./cell";

export default React.createClass({
    render() {
        return (
            <div className="column">
                {
                    this.props.column.map((cell, index) => {
                        return <Cell key={index} cell={cell} />
                    })
                }
            </div>
        );
    }
});