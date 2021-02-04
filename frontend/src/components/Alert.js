import {Component} from 'react'

class Alert extends Component {
    render() {
        const {alert:{msg, type}} = this.props
        return(
            <div className={`rounded-0 alert alert-${type}`}>{msg}</div>
        )
    }
}

export default Alert
