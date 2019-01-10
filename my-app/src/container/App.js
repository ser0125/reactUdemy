import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext({
  isAuth: false
});

class App extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      persons: [
        {id: 'asdasd', name: "Sergio", age:25},
        {id:'jiji', name: "Javier", age:22},
        {id:'jojo', name: "Juan", age:19}
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    }
  }
  componentWillMount(){
    console.log('App.js inside of component will mount');
  }
 static getDerivedStateFromProps(nextProps, prevState){
    console.log('[UPDATE app.js] Inside getDerivedStateFromProps', nextProps, prevState);
    return prevState;
  }
  getSnapshotBeforeUpdate(){
    console.log('[UPDATE app.js] Inside getSnapshotBeforeUpdate');
  }
  componentDidMount(){
    console.log('App.js inside component did mount');
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
    const doesShow = this.state.showPersons;
    this.setState( (prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    })
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('App.js inside render');
      let persons = null;
      if(this.state.showPersons) {
        persons = 
           <Persons 
           persons={this.state.persons} 
           click={this.deletePersonHandler} 
           changed={this.nameChangeHandler}/>
      }
    return (
      <Aux>
      <button onClick={()=>{this.setState({showPersons: true})}}>Show Persons</button>
      <Cockpit 
      appTitle={this.props.title}
      persons={this.state.persons} 
      showPersons={this.state.showPersons} 
      tooglePersonsHandler={this.tooglePersonsHandler}
      login={this.loginHandler}/>
      <AuthContext.Provider value={this.state.authenticated}>
          {persons}
      </AuthContext.Provider>
      </Aux>     
    );
  }
}

export default withClass(App, classes.App);
