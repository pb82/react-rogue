"use strict";

import * as React from "react";
import {
    Door,
    DoorOpen,
    Wall,
    Off,
    Player,
    Floor,
    Zombie
} from "./blocks/index";

export default ({cell}) => {
    switch(cell.t) {
        case Off.ID: return <Off.Off context={cell} parent={this} />
        case Floor.ID: return <Floor.Floor context={cell} parent={this} />;
        case Wall.ID: return <Wall.Wall context={cell} parent={this} />;
        case Player.ID: return <Player.Player context={cell} parent={this} />;
        case Door.ID: return <Door.Door context={cell} parent={this} />;
        case DoorOpen.ID: return <DoorOpen.DoorOpen context={cell} parent={this} />;
        case Zombie.ID: return <Zombie.Zombie context={cell} parent={this} />;
        default: return null;
    }
};