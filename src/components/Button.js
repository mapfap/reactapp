import React from 'react';
import './Button.css';

class Button extends React.Component {
  
  constructor(props) {
    super(props);
    this.effectSize = 50;
    this.transition = 'opacity 0.9s ease-out, transform 0.1s ease-in';
    this.state = { drops: [] };
    this.ref = React.createRef();
    this.theme = {
      'red': {buttonColor: '#f55d42', dropColor: '#c93b22'},
      'blue': {buttonColor: '#6c7ef8', dropColor: '#4e4edd'},
      'green': {buttonColor: '#8ced53', dropColor: '#64a83d'},
      'gray': {buttonColor: '#9c9c9c', dropColor: '#6e6e6e'}
    }
  }

  onClick(e) {
    const { x, y } = this.ref.current.getBoundingClientRect();
    // Fade in
    const id = '' + Date.now();
    const computedX = e.pageX - x - this.effectSize / 2 - 20;
    const computedY = e.pageY - y - this.effectSize / 2 - 30;
    const dropsCopy = this.state.drops;
    dropsCopy[id] = { transition: this.transition, opacity: 1, transform: '', x: computedX, y: computedY };
    this.setState({ drops: dropsCopy });

    // Fade out
    setTimeout(() => { 
      const dropsCopy = this.state.drops;
      dropsCopy[id] = { transition: '', opacity: 0, transform: 'scale(3.5)', x: computedX, y: computedY };
      this.setState({ drops: dropsCopy });
    }, 25);
  }

  render() {
    const { buttonColor, dropColor } = this.theme[this.props.color];
    const effects = Object.keys(this.state.drops).map(k => {
      const d = this.state.drops[k];
      return (
        <div key={k}
          className="drop"
          style={{
            backgroundColor: dropColor,
            transform: d.transform, 
            opacity: d.opacity, 
            transition: d.transition, 
            marginLeft: d.x, 
            marginTop: d.y
          }}>  
        </div>
      );
    });

    return (
      <div ref={this.ref} style={{ backgroundColor: buttonColor }} className="button" onClick={this.onClick.bind(this)}>
        <p> { this.props.text } </p>
        { effects }
      </div>
    );
  }
}

export default Button;
