import {Component} from 'react'

class TodoItem extends Component {
    render() {
        const {todo, editItem, handleDelete} = this.props
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span 
                    className={todo.completed ? "completed-todo" : ""}
                    title={todo.description}
                > 
                    {todo.title} 
                </span>
                <span>
                    <button onClick={() => editItem(todo)} className="btn btn-secondary mr-2"> Edit </button>
                    <button onClick={() => handleDelete(todo)} className="btn btn-danger"> Delete </button>
                </span>
            </li>
        )
    }
}

export default TodoItem
