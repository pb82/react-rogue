"use strict";

import * as React from "react";

export const ID = 1;

export const ACCESSIBLE = true;

export const Floor = ({context}) => {
    return <div className="cell">
        <div className={`block floor ${context.type}`}></div>
    </div>
};