"use strict";

import C from "./commons";
import Column from "./column";
import { on } from "./events";

export default React.createClass({
    componentDidMount() {
        on("rerender", "field", () => {
            this.forceUpdate();
        });
    },

    render() {
        var viewport = C.cropToViewport(this.props.viewport, this.props.map);

        return (
            <div className="field">
                {
                    viewport.map((column, index) => {
                        return <Column
                            column={column}
                            index={index}
                            key={index}
                        />
                    })
                }
            </div>
        );
    }
});