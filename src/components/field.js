"use strict";

import * as React from "react";
import C from "./commons";
import Column from "./column";

export default ({state}) => {
    var viewport = C.cropToViewport(state.viewport, state.map, state.player, state.enemies);

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
};