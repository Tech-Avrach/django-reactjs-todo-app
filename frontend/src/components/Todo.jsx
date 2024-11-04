// eslint-disable-next-line
import React, { useState, useEffect } from 'react'

import axios from 'axios'

function Todo() {

    const [todos, setTodos] = useState([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        listTodos()
    }, [])

    const editTodo = async (t) => {

       

        try {
            const response = await axios.put(`http://localhost:8000/api/todos/edit/${t.id}/`, {
                title: t.title,
                completed: !t.completed
            } )
            if(response.status === 200) {
                setTodos(todos.map((todo) => todo.id === t.id ? {...todo, completed: !todo.completed} : todo))
              
            }   
        } catch (error) {
            console.log("error on toggle complete", error)
        }
    }

    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/todos/delete/${id}/`)

            console.log("response on delete todo", response)
            if(response.status === 204) {
                setTodos(todos.filter(todo => todo.id !== id))
            }
        } catch (error) {
            console.log("error on delete todo", error)
        }
    }

    const listTodos = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/todos/')
            if(response.status === 200) {
                setTodos(response.data)
            }
        } catch (error) {
            console.log("error on list todos", error)
            
        }
    }

    const addTodo = async () => {
        try {
            if(inputValue.trim() !== '') {
                const response = await axios.post('http://localhost:8000/api/todos/add/', { title: inputValue, completed: false })
                if(response.status === 201) {
                    setInputValue('')
                    setTodos([...todos, response.data])
                    console.log("todo added", response.data)
                }
            }
        } catch (error) {
            console.log("error on add todo", error)
        }
    }

    return (
        <div className="container">
            <div className="todo-app">
            <div className="app-title">
                    <h2>To-do app</h2>
                    <i className="fa-solid fa-book-bookmark"></i>
                </div>
                <div className="row">
                    <input type="text" id="input-box" placeholder="add your tasks" 
                        value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button onClick={addTodo}>Add</button>
                </div>
                <ul id="list-container">
                    {todos?.map((todo) => (
                        <>

                         <li key={todo.id} className={todo.completed ? 'checked' : ''} onClick={() => editTodo(todo)}>
                        {todo.title}
                        <div>
                        <span className='delete' onClick={() => deleteTodo(todo.id)}>X</span>
                        </div>
                        
                    </li>
                           
                        </>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Todo