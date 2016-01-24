"use strict";

import { createStore } from "redux";
import initial_state from "./initial_state";

import { move_reducer } from "./reducers/move";
import { help_reducer, welcome_reducer, log_reducer } from "./reducers/log";

const game = (state = initial_state, action) => {
    switch (action.type) {
        case "WELCOME":
            return Object.assign({}, state, {log: welcome_reducer(state)});
        case "MOVE":
            return Object.assign({}, state, {
                log: log_reducer(state, {text: action.direction, style: "normal"}),
                viewport: move_reducer(state, action)
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