"use strict";

import * as React from "react";
import { dispatch } from "../flux/store";

export default React.createClass({
    componentWillMount() {
        document.addEventListener("keydown", this.keyDown);
    },

    componentWillUnmount() {
        // Cleanup
        document.removeEventListener("keydown", this.keyDown);
    },

    keyDown(key) {
        switch(key.keyCode) {
            case 38: dispatch({type: "MOVE", direction: "north"}); break;
            case 40: dispatch({type: "MOVE", direction: "south"}); break;
            case 37: dispatch({type: "MOVE", direction: "west"}); break;
            case 39: dispatch({type: "MOVE", direction: "east"}); break;
            case 72: dispatch({type: "HELP"}); break;
            default: break;
        }
    },

    render() {
        return null;
    }
});