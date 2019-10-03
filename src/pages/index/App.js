import React from 'react';
import './App.css';
import Button from '../../components/Button';

class App extends React.Component {
  render() {
    return (
      <div class="dialog">
        <p> Please select your option for this record. </p>
        <Button text="Archive" color="blue" />
        <Button text="Delete" color="red" />
      </div>
    );
  }
}

export default App;
