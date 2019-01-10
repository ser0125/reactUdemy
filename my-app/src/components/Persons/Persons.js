import React, {PureComponent} from 'react';
import Person from './Person/Person'

class Persons extends PureComponent {
  constructor(props) {
    super(props);
    console.log( '[Persons.js] Inside Constructor', props );
    this.lastPersonRef = React.createRef();
  }
  render() {
    return this.props.persons.map((person, index) => {
      return  <Person 
      click= {() => this.props.click(index)}
      name={person.name} 
      age={person.age} 
      key={person.id}
      ref={this.lastPersonRef}
      position={index}
      change={(event) => this.props.changed(event, person.id)}/>
    });
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log("[UPDATE persons.js] shouldComponentUpdate", nextState, nextProps);
    return nextProps.person !== this.props.persons || nextProps.changed !== this.props.chaged;
  }
  componentDidMount() {
    console.log('Persons.js did Mount');
    this.lastPersonRef.current.focus();
  }
  
}


export default Persons;