import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {name: "Sergio", age:25},
      {name: "Javier", age:22},
      {name: "Juan", age:19}
    ],
    otherState: 'some other value'
  }
  switchNameHandler = (newName) => {
   // console.log('Was clicked!!');
  //Dont do this this.state.persons[0].name = "Max"
  this.setState({ persons: [
    {name: newName, age:25},
    {name: "Javier", age:22},
    {name: "Juan", age:22}
  ]
});
  }
  nameChangeHandler = (event) => {
    this.setState({ persons: [
      {name: "Maximilian", age:25},
      {name: event.target.value, age:22},
      {name: "Juan", age:22}
      ]
    });
  }
  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
    return (
      <div className="App">
          <h1>Hi I'm a React App</h1>
          <button 
          style = {style}
          onClick={() => this.switchNameHandler('Jorge!!')}>Switch Name</button>
          <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
          <Person 
          name={this.state.persons[1].name}
          age={this.state.persons[1].age} 
          click={this.switchNameHandler.bind(this, 'Alex!!')}
          change={this.nameChangeHandler}> My Hobbies: Racing </Person>
          <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
      </div>
    );
  }
}

export default App;
