import React from 'react';
import './Room.css'

class Room extends React.Component {

  render () {
    const stateClass = this.props.item.isOccupied ? "occupied" : "free";
    return (
      <li className={stateClass} >
        <p className="room">{this.props.item.id}</p>
      </li>
    );
  }
}

export default Room;