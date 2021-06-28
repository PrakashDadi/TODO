import React, { useState, ChangeEvent, useEffect} from 'react'
import Axios from 'axios';
import TodoListView from './TodoListView';
import { todoList } from '../interfaces';
import GetTodos from './GetTodos';



const TodoForm = () => {

  const createId = () => {
    return Math.floor(Math.random() * 10000)
  }

  const [id, setId] = useState<number>(createId());
  const [taskName, setTaskname] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [createdBy, setCreatedBy] = useState<string>('');
  const [createdOn, setCreatedOn] = useState<Date|string>(new Date().toISOString());

  const [todos, setTodos] = useState<todoList[]>([])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((todoList) => {
      setTodos(todoList.data)
    })
  }, [])

  const addID = () => {
    setId(Math.floor(Math.random() * 10000))
    setCreatedOn(new Date().toISOString())
  }
  const addTodo = () => {
    if (taskName === "" || description === "" || createdBy === "") {
      alert("please fill all feilds")
      return
    } 
    addID()
    setTodos([...todos, {
      id:id,
      taskName: taskName,
      description: description,
      createdBy: createdBy,
      createdOn:createdOn
    }])
    
    Axios.post("http://localhost:3001/api/insert", {
      id: id,
      taskName: taskName,
      description: description,
      createdBy: createdBy,
      createdOn: createdOn
    });
    
    setTaskname('');
    setDescription('');
    setCreatedBy('');
  }

 

  return (
    <div>
    <div className="todo-form">
      <div>
        <input
          type="text"
          placeholder="Enter Task Name"
         value={taskName}
          name="taskName"
          className="todo-taskName"
          onChange={ (e:ChangeEvent<HTMLInputElement>) => {
            setTaskname(e.target.value)
          }}
        /></div>
        <div>
        <input
          type="text"
          placeholder="Enter Description"
         value={description}
          name="description"
          className="todo-description"
          onChange={ (e:ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value)
          }}
        /></div>
        <div>
        <input
          type="text"
          value={createdBy}
          name="createdBy"
          placeholder = "Created By"
          className="todo-createdBy"
          onChange={ (e:ChangeEvent<HTMLInputElement>) => {
            setCreatedBy(e.target.value)
          }}
        /></div>
        <div>
        <button
          className="todo-button"
          onClick={addTodo}>
         Add-Todo
        </button></div>
      </div>
      <div className='todoView'>
        <TodoListView todos={ todos } setTodos ={setTodos}/>
      </div>
      </div>
  )
}

export default TodoForm

