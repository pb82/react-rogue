"use strict";

import {
    Door,
    DoorOpen,
    Wall,
    Off,
    Player,
    Floor,
    Zombie
} from "./blocks/index";

export default React.createClass({
    render() {
        return (
            <div className="cell">
                {
                    (() => {
                        switch (this.props.cell.t) {
                            case Off.ID: return <Off.Off context={this.props.cell} parent={this} />
                            case Floor.ID: return <Floor.Floor context={this.props.cell} parent={this} />;
                            case Wall.ID: return <Wall.Wall context={this.props.cell} parent={this} />;
                            case Player.ID: return <Player.Player context={this.props.cell} parent={this} />;
                            case Door.ID: return <Door.Door context={this.props.cell} parent={this} />;
                            case DoorOpen.ID: return <DoorOpen.DoorOpen context={this.props.cell} parent={this} />;
                            case Zombie.ID: return <Zombie.Zombie context={this.props.cell} parent={this} />;
                            default: return null;
                        }
                    })()
                }
            </div>
        );
    }
});