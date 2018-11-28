import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    value: '',
    length: 0
  };
  inputChangeListener = (event) => {
     this.setState({
       value: event.target.value,
       length: event.target.value.length
      });
  }
  removeChar = (index) => {
    let newValue = this.state.value.split('').slice();
    newValue.splice(index,1);
    this.setState({
      value: newValue.join('')
    })
  }

  render() {
    let charComponents = null;
    charComponents = ( 
      <div>
      {this.state.value.split('').map((char, index) => {
        return <CharComponent char={char} key={index} click={() => this.removeChar(index)}/>
      })}
      </div>
      )

    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <input type="text" onChange={this.inputChangeListener} value={this.state.value}/>
        <p>{this.state.length}</p>
        <ValidationComponent length={this.state.length}/>
        {charComponents}
      </div>
    );
  }
}

export default App;
