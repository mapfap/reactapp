import React from 'react';
import Room from './Room'
import './RoomList.css'

import axios from 'axios';

class RoomList extends React.Component {
  
  state = {
    rooms: [],
    isLoading: false,
    errorMessages: ''
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios.get('/api/rooms')
      .then(res => {
        const rooms = res.data;
        this.setState({ isLoading: false });
        this.setState({ rooms: rooms });
      }).catch(err => {
        this.setState({ isLoading: false, errorMessages: err.toString() });
        console.log(err);
      })
  }

  render () {
    const noRoomMessage = this.state.rooms.length == 0 ? 'No rooms found.' : '';
    const loader = this.state.isLoading? (<p className="loader">Loading..</p>) : '';
    const items = this.state.rooms.map((item, index) => {
      return (
        <Room key={index} item={item} />
      );
    });

    return (
      <div>
        {loader}
        {noRoomMessage}
        {this.state.errorMessages}
        <ul>{items}</ul>
      </div>
    );
  }
}

export default RoomList;