import {Component} from 'react'
import TodoItem from './TodoItem'

class Todos extends Component {
    render () {
        const {todos, viewCompleted, editItem, handleDelete} = this.props
        const selectedTodos = todos.filter(todo => todo.completed === viewCompleted)
        return (
            <ul className="list-group list-group-flush">
                {selectedTodos.map(todo => 
                    <TodoItem key={todo.id} todo={todo} editItem={editItem} handleDelete={handleDelete}/>
                )}
            </ul>
        )
    }
}

export default Todos
