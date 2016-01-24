"use strict";

import C from "../../components/commons";
import initial_state from "../initial_state";

const LOG_SIZE = 4;

export const help_reducer = (state) => {
    return {
        count: state.log.count + 4,
        messages: [
            {text: "Use cursor keys to move. Use", style: "help"},
            {text: "the mouse to interact with things.", style: "help"},
            {text: "Hover items to see if they can be", style: "help"},
            {text: "interacted with.", style: "help"}
        ]
    };
};

export const welcome_reducer = (state) => {
    return {
        count: state.log.count + 4,
        messages: [
            {text: "Welcome to react-rogue!", style: "normal"},
            {text: "If you need help,", style: "nornal"},
            {text: "type `h`", style: "help"},
            {text: "Good luck!", style: "normal"}
        ]
    }
};

export const log_reducer = (state, action) => {
    state.log.messages.push({text: action.text, style: action.style});

    return {
        count: state.log.count + 1,
        messages: state.log.messages.slice(-LOG_SIZE)
    };
};