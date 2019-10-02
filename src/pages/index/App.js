import React from 'react';
import './App.css';
import RoomList from '../../components/room/RoomList';

class App extends React.Component {
  
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h2> Room Finder </h2>
          <RoomList/>
        </header>
      </div>
    );
  }
}

export default App;
