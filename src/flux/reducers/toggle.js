"use strict";

export const toggle_reducer = (state, action) => {
    let x = action.x, y = action.y;
    state.map[y][x].a = !state.map[y][x].a;
    return state.map;
};