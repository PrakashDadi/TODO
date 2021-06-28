import React, {useState}from 'react'
import GetTodos from './GetTodos'
// import  todos  from './TodoForm'
import { todoList } from '../interfaces'
//import TodoForm from './TodoForm'
//import editedTaskName from './GetTodos'


const TodoListView = (prop: { todos: todoList[] , setTodos:React.Dispatch<React.SetStateAction<todoList[]>> }) => {
  console.log(prop.todos)

  let todos=prop.todos
  let setTodos=prop.setTodos

  const completeTask = (taskNameToDelete: string): void => {
    prop.setTodos(prop.todos.filter((todoList) => {
      return todoList.taskName !== taskNameToDelete
    }))
  }

 /* const [editedTodo , setEditedTodo] = useState<number>();

  const submitEdit = (id:number|undefined|string) =>{
    let updatedTodos:todoList[] = [...prop.todos].map((todoList: todoList) =>{
      if(todoList.id === id) {
        todoList.taskName = editedTaskname;
        todoList.description = editedDescription;
        todoList.createdBy=editedCreatedBy;
        todoList.createdOn= +new Date().toISOString()
      }
    })
    prop.setTodos(updatedTodos)
    setEditedTodo(0)
  } */

  return (
    <div className="TodoListView">
      {prop.todos.map((todoList: todoList, key: number) => {
        return (
          <GetTodos key={key} todoList={todoList} completeTask ={completeTask} todos={todos} setTodos={setTodos}/>
        )
      })}
    </div>
  )
}

export default TodoListView
