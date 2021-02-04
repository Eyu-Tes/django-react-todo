import {Component} from 'react'
import {
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Form, 
    FormGroup, 
    Input, 
    Label
} from 'reactstrap'


class CustomModal extends Component {
    state = {
        // todo item to be edited
        activeItem: this.props.activeItem
    }
    onSubmit = e => {
        e.preventDefault()
        this.props.onSave(this.state.activeItem)
    }
    handleChange = e => {
        let {name, value} = e.target
        if (e.target.type === 'checkbox') {
            value = e.target.checked
        }
        const activeItem = {...this.state.activeItem, [name]: value}
        this.setState({activeItem})
    }
    render() {
        const {toggle} = this.props
        return(
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
                <Form onSubmit={this.onSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input 
                                type="text"
                                name="title"
                                value={this.state.activeItem.title}
                                onChange={this.handleChange}
                                placeholder="Enter todo title"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input 
                                type="text"
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Enter todo description"
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label for="completed">
                                <Input
                                    type="checkbox"
                                    name="completed"
                                    checked={this.state.activeItem.completed}
                                    onChange={this.handleChange}
                                />
                                Completed
                            </Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" className="success">
                            Save
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}

export default CustomModal
