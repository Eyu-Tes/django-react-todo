import {Component} from 'react'
import AddButton from './components/AddButton'
import TabList from './components/TabList'
import Todos from './components/Todos'
import Modal from './components/Modal'
import Alert from './components/Alert'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    viewCompleted: false, 
    todos: [], 
    modal: false, 
    activeItem: {
      title: '', 
      description: '', 
      completed: false
    }, 
    alert: null, 
  }

  displayCompleted = status => (
    status ? 
    this.setState({viewCompleted: true}) : 
    this.setState({viewCompleted: false})
  )

  toggle = () => {
    this.setState({modal: !this.state.modal})
  }

  createItem = () => {
    const item = {title: '', description: '', completed: false}
    this.setState({activeItem: item, modal: !this.state.modal})
  }

  editItem = item => {
    this.setState({activeItem: item, modal: !this.state.modal})
  }

  handleSubmit = item => {
    this.toggle()
    if(item.id) {
      axios
      .put(`/api/todos/${item.id}`, item)
      .then(res => {
        this.refreshList()
        this.setState({alert: {msg: 'Todo updated!', type: 'success'}})
        setTimeout(() => this.setState({alert: null}), 1500)
      })
      .catch(err => {
        this.setState({alert: {msg: 'Unable to update todo!', type: 'danger'}})
        setTimeout(() => this.setState({alert: null}), 1500)
      })
    }
    else {
      axios
      .post('/api/todos/', item)
      .then(res => {
        this.refreshList()
        this.setState({alert: {msg: 'Todo created!', type: 'success'}})
        setTimeout(() => this.setState({alert: null}), 1500)
      })
      .catch(err => {
        this.setState({alert: {msg: 'Unable to create todo!', type: 'danger'}})
        setTimeout(() => this.setState({alert: null}), 1500)
      })
    }
  }

  handleDelete = item => {
    axios
    .delete(`/api/todos/${item.id}`)
    .then(res => {
      this.refreshList()
      this.setState({alert: {msg: 'Todo deleted!', type: 'success'}})
      setTimeout(() => this.setState({alert: null}), 1500)
    })
    .catch(err => {
      this.setState({alert: {msg: 'Unable to delete todo!', type: 'danger'}})
      setTimeout(() => this.setState({alert: null}), 1500)
    })
  }

  refreshList = () => {
    axios
    .get("/api/todos/")
    .then(res => this.setState({todos: res.data}))
    .catch(err => {
      this.setState({alert: {msg: 'Unable to fetch todo(s)!', type: 'danger'}})
      setTimeout(() => this.setState({alert: null}), 1500)
    })
  }

  componentDidMount() {
    this.refreshList()
  }

  render() {
    const {todos, viewCompleted, modal, activeItem, alert} = this.state
    return (
      <main className="container">
        <h1 className="text-uppercase text-center my-4">Django-React Todo app</h1>
        <div className="row ">
          <div className="col-10 col-md-6 mx-auto p-0">
            {alert && <Alert alert={alert}/>}
            <div className="card p-3">
              <AddButton createItem={this.createItem}/>
              <TabList viewCompleted={viewCompleted} displayCompleted={this.displayCompleted}/>
              <Todos todos={todos} viewCompleted={viewCompleted} editItem={this.editItem}  handleDelete={this.handleDelete}/>
            </div>
          </div>
        </div>
        {modal && (
          <Modal 
            activeItem={activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        )}
      </main>
    );
  }
}

export default App
