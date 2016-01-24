"use strict";

import * as React from "react";

export default ({log}) => {
    return (
        <div className="console">
            {
                log.messages.map((message, index) => {
                    return <div key={index}>
                        <span className="prompt">{`(${log.count - index})>`}</span>
                        <span className={message.style}>{message.text}</span>
                    </div>
                })
            }
        </div>
    );
};