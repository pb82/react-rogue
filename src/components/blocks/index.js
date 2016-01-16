import * as _Door from "./door";
import * as _DoorOpen from "./doorOpen";
import * as _Wall from "./wall";
import * as _Floor from "./floor";
import * as _Off from "./off";
import * as _Player from "./player";
import * as _Zombie from "./zombie";

export var Door = _Door;
export var DoorOpen = _DoorOpen;
export var Wall = _Wall;
export var Floor = _Floor;
export var Player = _Player;
export var Off = _Off;
export var Zombie = _Zombie;

export function accessible(block) {
    switch (block.t) {
        case _Door.ID: return _Door.ACCESSIBLE;
        case _DoorOpen.ID: return _DoorOpen.ACCESSIBLE;
        case _Wall.ID: return _Wall.ACCESSIBLE;
        case _Floor.ID: return _Floor.ACCESSIBLE;
        case _Player.ID: return _Player.ACCESSIBLE;
        case _Off.ID: return _Off.ACCESSIBLE;
        case _Zombie.ID: return _Zombie.ACCESSIBLE;
        default: return false;
    }
}