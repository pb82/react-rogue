"use strict";

import * as React from "react";
import Cell from "./cell";

export default ({column}) => {
    return (
        <div className="column">
            {
                column.map((cell, index) => {
                    return <Cell key={index} cell={cell} />
                })
            }
        </div>
    );
};