"use strict";

export default {
    getInitialState() {
        return {
            anim: ""
        };
    },

    mouseOver: function () {
        this.setState({anim: " animated pulse"});
    },

    mouseOut: function () {
        this.setState({anim: ""});
    }
};