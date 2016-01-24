"use strict";

import * as React from "react";

export const ID = 2;

export const ACCESSIBLE = false;

export const Wall = ({context}) => {
    return <div className="cell">
        <div className={`block ${context.type || "wall"}`}></div>
    </div>
};