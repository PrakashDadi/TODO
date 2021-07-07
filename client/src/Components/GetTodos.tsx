import React, {ChangeEvent, useState} from 'react'
import { todoList } from '../interfaces'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {TiEdit, TiTick, TiTimes} from 'react-icons/ti'
import Axios from 'axios'
import { checkServerIdentity } from 'tls'
//import TodoListView from './TodoListView'
//import TodoForm from './TodoForm'
//import TodoList from './TodoList'



interface props{
  todoList: todoList;
  completeTask(taskNameToDelete: string): void;
  todos:todoList[]
  setTodos:React.Dispatch<React.SetStateAction<todoList[]>>
}


const deleteTodo = (taskId:number|undefined|string)=>{
  Axios.delete(`http://localhost:3001/api/delete/${taskId}`)
}


const GetTodos = ({todoList, completeTask, todos , setTodos}:props,) => {

  const[editedTaskName , setEditedTaskName]= useState<string>("")
  const[editedDescription , setEditedDescription]= useState<string>("")
  const[editedCreatedBy , setEditedCreatedBy]= useState<string>("")

  const [editedTodo , setEditedTodo] = useState<number|string|undefined>();

  const cancelEdit = () =>{
    setEditedTodo('')
  }


  const submitEdit = (id:number|undefined|string) =>{
    if(editedTaskName === '' || editedDescription === ' ' || editedCreatedBy === '' ){
      alert('please fill out all feilds')
    } else {
    const updatedTodos = [...todos].map((todoList: todoList) => {
      if(todoList.id === id) {
        todoList.taskName = editedTaskName;
        todoList.description = editedDescription;
        todoList.createdBy=editedCreatedBy;
        todoList.createdOn=new Date().toISOString()
      }
      return todoList;
    })
    setTodos(updatedTodos)
      setEditedTodo('')
  }
  }


  const updateTodo = (newId: number|string|undefined) => {
    Axios.put("http://localhost:3001/api/update", {
        id: newId,
        taskName: editedTaskName,
        description: editedDescription,
        createdBy: editedCreatedBy,
        createdOn: new Date().toISOString()
    })      
  }
  const[checked, setChecked]=useState<boolean>(false)

  const strikeThrough = () =>{
   if(checked === false){
    setChecked(true)
   }else {
    setChecked(false)
   }
  }
 

  return (
    <div className='todo-container'>
      {todoList.id === editedTodo? (
        <div className="editing-form">
        <span>{todoList.id}</span>
        <input
          type="text"
          placeholder="Enter Task Name"
          name="editedTaskName"
          value={editedTaskName}
          className="editedTaskName"
          onChange={ (e:ChangeEvent<HTMLInputElement>) => {
           setEditedTaskName(e.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Enter Description"
          name="description"
          value={editedDescription}
          className="editeddescription"
          onChange={ (e:ChangeEvent<HTMLInputElement>) => {
            setEditedDescription(e.target.value)
          }}
        />
        <input
          type="text"
          name="editedCreatedBy"
          placeholder = "Created By"
          className="editedcreatedBy"
          value={editedCreatedBy}
          onChange={ (e:ChangeEvent<HTMLInputElement>) => {
            setEditedCreatedBy(e.target.value)
          }}
        />
        <span>{todoList.createdOn}</span>
        </div>
      ):(<div className='todo-row'>
        <input type='checkbox' id="completed" defaultChecked={false} onChange={strikeThrough}/>
        {checked === true?(
        <div className='strike-through'>
        <span>{todoList.id}</span>
        <span>{todoList.taskName}</span>
        <span>{todoList.description}</span>
        <span>{todoList.createdBy}</span>
        <span>{todoList.createdOn}</span>
        </div>
        ):(
        <div className='not-strike-through'>
        <span>{todoList.id}</span>
        <span>{todoList.taskName}</span>
        <span>{todoList.description}</span>
        <span>{todoList.createdBy}</span>
        <span>{todoList.createdOn}</span>
        </div> )}
              
      </div>)}
      
      <div className="icons">
        <div className="edit-actions">
        {todoList.id === editedTodo? (
            <div>
            <TiTick onClick={() =>{
            submitEdit(todoList.id) 
            updateTodo(todoList.id)
            }} className="edit-icon"/>
            <TiTimes onClick={() =>{
            cancelEdit()
            } }className="cancel-button"/>
            </div>
        ) : (
          <div>
          <TiEdit onClick={() => setEditedTodo(todoList.id)} className="edit-icon"/>
          <RiDeleteBin6Fill  onClick={() =>{
            completeTask(todoList.taskName)
            deleteTodo(todoList.id)
             } } className="delete-icon"/>
             </div>
       )}
      </div>
      
      </div>
  </div>
)
}

export default GetTodos