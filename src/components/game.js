"use strict"

import * as React from "react";
import C from "./commons";
import Field from "./field";
import Console from "./console";
import Controls from "./controls";

import { store, dispatch, subscribe } from "../flux/store";

export default React.createClass({
    componentWillMount() {
        this.unsubscribe = subscribe(() => {
            this.forceUpdate();
        });
    },

    componentWillUnmount() {
        // Cleanup
        this.unsubscribe();
    },

    componentDidMount() {
        // Display a welcome message when the game is loaded
        dispatch({type: "WELCOME"});
    },

    render() {
        return (
            <div>
                <Field state={store.getState()} />
                <Console log={store.getState().log}/>
                <Controls />
            </div>
        );
    }
});