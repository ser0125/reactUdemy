import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: 'asdasd', name: "Sergio", age:25},
      {id:'jiji', name: "Javier", age:22},
      {id:'jojo', name: "Juan", age:19}
    ],
    otherState: 'some other value',
    showPersons: false
  }
  
  nameChangeHandler = (event, id) => {
   const personIndex = this.state.persons.findIndex(p =>{
    return p.id === id;
   });

   const person = {
     ...this.state.persons[personIndex]
   }
   person.name = event.target.value;

   const persons = [...this.state.persons];
   persons[personIndex] = person;

   this.setState({
    persons: persons
   })
  }
  
  deletePersonHandler = (personIndex) => {
    let newPersons = this.state.persons.slice();
    newPersons.splice(personIndex,1);

    this.setState({
      persons: newPersons
    })
  }

  tooglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  render() {
    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      color: 'white',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

      let persons = null;
      if(this.state.showPersons) {
        persons = (
          <div>
            {this.state.persons.map((person, index) => {
              return  <Person 
              click= {() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age} 
              key={person.id}
              change={(event) => this.nameChangeHandler(event, person.id)}/>

            })}
          </div>
        )
        style.backgroundColor = 'red';
      }

      const classes = [];
      if(this.state.persons.length <= 2){
        classes.push('red');
      }if(this.state.persons.length <= 1){
        classes.push('bold')
      }

    return (
      <div className="App">
          <h1>Hi I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working</p>
          <button 
          style = {style}
          onClick={this.tooglePersonsHandler}>Show Name</button>    
          {persons}     
      </div>
    );
  }
}

export default App;
