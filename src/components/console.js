"use strict";

import { on } from "./events";

const LOG_SIZE = 4;

export default React.createClass({
    getInitialState() {
        return {
            count: 0,
            messages: []
        }
    },

    componentDidMount() {
        on("log", "console", this.log);
    },

    log(data) {
        this.state.messages.push(data);
        this.state.count++;

        this.setState({
            messages: this.state.messages.slice(-LOG_SIZE)
        });
    },

    render() {
        var messages = [];
        this.state.messages.forEach((message) => { messages.push(message) });
        messages.reverse();

        return (
            <div className="console">
                {
                    messages.map((message, index) => {
                        return <div>
                            <span className="prompt">{`(${this.state.count - index})>`}</span>
                            <span className={message.type}>{message.text}</span>
                        </div>
                    })
                }
            </div>
        );
    }
});