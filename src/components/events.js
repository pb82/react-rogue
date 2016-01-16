"use strict";

var events = {};

export function on(event, receiver, callback) {
    if (!events[event]) {
        events[event] = {};
    }

    events[event][receiver] = callback;
};

export function off(event, receiver) {
    if (events[event]) {
        delete events[event][receiver];
    }
};

export function emit(event, data) {
    if (events[event]) {
        for (let prop in events[event]) {
            if (!events[event].hasOwnProperty(prop)) {
                continue;
            } else {
                events[event][prop](data);
            }
        }
    }
}

