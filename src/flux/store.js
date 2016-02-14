"use strict";

import { createStore } from "redux";
import initial_state from "./initial_state";

import { move_reducer } from "./reducers/move";
import { help_reducer, welcome_reducer, log_reducer } from "./reducers/log";
import { toggle_reducer } from "./reducers/toggle";

function accessible(block) {
    if (block.t === 3 || block.t === 2 || block.t === 998) {
        return false;
    }

    return true;
}

const prepare = (state) => {
    for (let y = 0; y < state.map.length; y++) {
        for (let x = 0; x < state.map[0].length; x++) {
            state.map[y][x].a = accessible(state.map[y][x]);
        }
    }

    return state;
};

const game = (state = prepare(initial_state), action) => {
    switch (action.type) {
        case "WELCOME":
            return Object.assign({}, state, {log: welcome_reducer(state)});
        case "MOVE":
            return Object.assign({}, state, {
                log: log_reducer(state, {text: action.direction, style: "normal"}),
                viewport: move_reducer(state, action)
            });
        case "TOGGLE_DOOR":
            return Object.assign({}, state, {
                map: toggle_reducer(state, action)
            });
        case "HELP":
            return Object.assign({}, state, {log: help_reducer(state)});
        case "LOG":
            return Object.assign({}, state, {log: log_reducer(state, action)});
        default:
            return state;
    }
};

export const store = createStore(game);
export const subscribe = store.subscribe;
export const dispatch = store.dispatch;