"use strict";

import C from "../../components/commons";
import initial_state from "../initial_state";

const advance = {
    x: C.advance(initial_state.map, "x"),
    y: C.advance(initial_state.map, "y")
};

const move = (axis, d, state) => {
    return advance[axis](state.viewport, d, state.enemies, (err, viewport) => {
        if (!err) {
            return viewport;
        } else {
            return state.viewport;
        }
    });
};

export const move_reducer = (state, action) => {
    switch(action.direction) {
        case "north":
            return move("y", -1, state);
        case "south":
            return move("y", 1, state);
        case "east":
            return move("x", 1, state);
        case "west":
            return move("x", -1, state);
    }
};
