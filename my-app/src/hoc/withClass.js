import React, {Component} from 'react';

const withClass = (WrappedComponent,className) => {
   /* return (props) => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    )
    */ 

   const WithClass = class extends Component {
        render(){
            console.log("Render WrappedComponent");
            return (
                <div className={className}>
                <WrappedComponent ref={this.props.forwardedRef} {...this.props}/>
                </div>
                )
            }
        }
        return React.forwardRef((props, ref)=> {
            return <WithClass {...props} forwardedRef={ref}/>
        });
}

export default withClass;