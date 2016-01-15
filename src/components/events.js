"use strict";

var events = {};

export function on(event, callback) {
    events[event] = callback;
};

export function emit(event, data) {
    if (events[event]) {
        events[event](data);
    }
}

