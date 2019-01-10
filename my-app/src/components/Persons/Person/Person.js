import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Aux';
import {AuthContext} from '../../../container/App';


class Person extends Component {
    constructor( props ) {
        super( props );
        this.inputElement = React.createRef();
    }

    render () {
        console.log('Person.js render');
        return (
            <Aux>
                <AuthContext.Consumer>
            {auth => auth ? <p>I'm authenticated</p> : null}
            </AuthContext.Consumer>
            <p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age}</p>
            <p>{this.props.children}</p>
            <input 
            ref={this.inputElement}
            type="text" 
            onChange={this.props.change} 
            value={this.props.name}/>
            </Aux>
        )
    }
componentWillMount() {
    console.log('[Person.js] inside componentWillMount');
}x
    componentDidMount() {
        console.log('[Person.js] inside componentDidMount', this.inputElement);
        //this.focusInput();
    }
    focus() {
            this.inputElement.current.focus();
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    change: PropTypes.func
}

export default withClass(Person, classes.Person);