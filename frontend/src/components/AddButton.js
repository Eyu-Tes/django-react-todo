import {Component} from 'react'
import PropTypes from 'prop-types'

class AddButton extends Component {
    static propTypes = {
        createItem: PropTypes.func.isRequired
    }
    render () {
        const {createItem} = this.props
        return(
            <div>
                <button onClick={createItem} className="btn btn-primary">Add task</button>
            </div>
        )
    }
}

export default AddButton
