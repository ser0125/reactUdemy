import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import { increment, decrement, storeResult, deleteResult, add10, sub15 } from '../../store/actions/index';
class Counter extends Component {

    render () {
        let results = null;
        if (this.props.storedResults) {
            results = this.props.storedResults.map(result => {
                return <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>
        })
    }
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.addFiveToCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.subtractFiveToCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {results}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.count,
        storedResults: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(increment()),
        onDecrementCounter: () => dispatch(decrement()),
        addFiveToCounter: () => dispatch(add10(10)),
        subtractFiveToCounter: () => dispatch(sub15(15)),
        onStoreResult: (count) => dispatch(storeResult({count: count})),
        onDeleteResult: (id) => dispatch(deleteResult({resultId: id} )),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);