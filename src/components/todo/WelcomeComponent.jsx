import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.retreiveWelcomeMessage = this.retreiveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
        this.state = {
            welcomeMessage : ''
        }
    }
    render() {
        return (
            <>
                <h1>Welcome</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. 
                    You can manage your todos <Link to="/todos">here</Link>
                </div>
                <div className="container">
                    Click here to get a custimized welcome message.
                    <button className="btn btn-success" onClick={this.retreiveWelcomeMessage}>Get Welcome Message</button>
                </div>     
                <div className='container'>
                    {this.state.welcomeMessage}
                </div>           
            </>
        )
    }

    retreiveWelcomeMessage() {
        /*HelloWorldService.excecuteHelloWorldService()
        .then(response => this.handleSuccessfulResponse(response))*/
        /*HelloWorldService.excecuteHelloWorldBeanService()
        .then(response => this.handleSuccessfulResponse(response))*/
        HelloWorldService.excecuteHelloWorldPathVariableService(this.props.match.params.name)
        .then(response => this.handleSuccessfulResponse(response))      
        .catch(error => this.handleError(error))          
    }

    handleSuccessfulResponse(response) {
        this.setState({welcomeMessage: response.data.message})
    }

    handleError(error)
    {
        let errorMessage = ''
        if(error.message) 
            errorMessage += error.message
        
        if(error.response && error.response.data)
            errorMessage += error.response.data.message
        
        this.setState({welcomeMessage: errorMessage})
    }    
}


export default WelcomeComponent