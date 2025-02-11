"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)))
    setEditingId(null)
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new todo"
            className="flex-grow"
          />
          <Button onClick={addTodo}>Add Todo</Button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-2 p-2 border rounded">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="h-4 w-4"
              />
              {editingId === todo.id ? (
                <Input
                  type="text"
                  value={todo.text}
                  onChange={(e) => updateTodo(todo.id, e.target.value)}
                  onBlur={() => setEditingId(null)}
                  autoFocus
                  className="flex-grow"
                />
              ) : (
                <span
                  className={`flex-grow ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                  onDoubleClick={() => setEditingId(todo.id)}
                >
                  {todo.text}
                </span>
              )}
              <Button variant="destructive" size="sm" onClick={() => deleteTodo(todo.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </main>

      <footer className="bg-muted text-muted-foreground p-4 text-center">
        <p>&copy; 2025 Todo List App. All rights reserved.</p>
      </footer>
    </div>
  )
}

