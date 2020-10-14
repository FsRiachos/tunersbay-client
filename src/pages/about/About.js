import React from "react"
import './About.css';
import Author from '../../components/autor/Author';

export default class AboutPage extends React.Component {
  render() {
    return (
      <div className="App" id="about-board">
        <h3>Hi! We're in About</h3>
        <Author
          name="Fred" 
          info={{work: 'builder', description: 'car guy'}}
        />
      </div>
    )
  }
}