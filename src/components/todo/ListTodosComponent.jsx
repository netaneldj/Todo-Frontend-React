import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthentificationService from './AuthentificationService.js'
import moment from 'moment'

class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos : [],
            message : null 
        }

        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthentificationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    this.setState({todos: response.data})
                }
            )
    }

    addTodoClicked(id) {
        // /todos
        this.props.history.push('/todos/-1');
    }        

    updateTodoClicked(id) {
        // /todos/${id}
        this.props.history.push(`/todos/${id}`);
    }    

    deleteTodoClicked(id) {
        let username = AuthentificationService.getLoggedInUserName()
        TodoDataService.deleteTodo(username,id)
            .then(
                response => {
                    this.setState({message: `Delete of todo ${id} Successful`});
                    this.refreshTodos()
                }
            )
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>                                
                                <th>Is Completed?</th>
                                <th>Update</th>                                
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{moment(todo.targetDate).utcOffset('+0100').format('YYYY-MM-DD')}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>                                            
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>                                
                                )
                            }
                        </tbody>
                    </table>
                    <div className='row'>
                            <button className='btn btn-success' onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent
