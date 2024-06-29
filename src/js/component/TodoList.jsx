import React, { useEffect, useState } from "react";

export const TodoListFetch = () => {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);
    //const [edit, setEdit] = useState(false);
    const host = "https://playground.4geeks.com/todo";
    const user = "broccoli";


    const handleAddTodo = async (event) => {
        event.preventDefault();
        const dataToSend = {
            label: task,
            is_done: false
        }
        const uri = `${host}/todos/${user}`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch(uri, options)
        console.log(response);
        if (!response.ok) {
            console.log('Error', response.status, response.statusText);
            return
        }
        const data = await response.json()
        console.log(data);
        getTodos()
    }

    const getTodos = async () => {
        const uri = `${host}/users/${user}`;
        const options = {
            method: "GET"
        };

        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Error: ", response.status, response.statusText);
            return;
        }

        const data = await response.json()
        setList(data.todos)
        console.log("data:", data);
    }


    const deleteTask = async (item) => {
        const uri = `${host}/todos/${item.id}`
        const options = {
            method: "DELETE"
        }
        const response = await fetch(uri, options)
        console.log(response);
        if (!response.ok) {
            console.log("Error: ", response.status, response.statusText);
            return
        }
        getTodos()
    }

    const updateTask = async (item) => {
        const uri = `${host}/todos/${item.id}`
        const dataToSend = {
            label: task,
            is_done: false,
        }
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend),
        };

        const response = await fetch(uri, options);
        if (!response.ok) {
            console.warn("Error: ", response.status, response.statusText);
            return
        };
        const data = await response.json();
        console.log("data: ", data);
        getTodos()
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className="container w-50">
            <h1 className="text-primary mt-4">Todo List</h1>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="exampleInputEmail1" className="form-label"></label>
                <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Add your list" aria-describedby="default input example"
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                />
            </form>
            <h2 className="mt-3 text-warning">
                Task List
            </h2>
            <ul className="list-group">
                {list.map((item, id) =>
                    <li key={id} className="list-group-item d-flex justify-content-between hidden-icon">
                        <div>
                            {item.label}
                        </div>
                        <div>
                            <span onClick={() => updateTask(item)}>
                                <i className="fas fa-edit text-primary"></i>
                            </span>
                            <span onClick={() => deleteTask(item)} className="ms-3">
                                <i className="fas fa-trash text-danger"></i>
                            </span>
                        </div>
                    </li>
                )
                }
                <li className="list-group-item">
                    {list.length} items left
                </li>
            </ul>
        </div>

    )
} 
