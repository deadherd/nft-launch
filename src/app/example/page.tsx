"use client";

import { useState } from "react";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
//import s from "./page.module.sass";

type Task = { name: string };

export default function TasksPage() {
  // wire up hook for "tasks" collection
  const { items, addItem, updateItem, deleteItem } =
    useFirestoreCollection<Task>("tasks");

  const [newName, setNewName] = useState("");

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>tasks</h1>

      {/* add form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newName.trim()) return;
          addItem({ name: newName });
          setNewName("");
        }}
      >
        <input
          placeholder="new task"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button type="submit">add</button>
      </form>

      {/* list + inline edit + delete */}
      <ul>
        {items.map((task) => (
          <li key={task.id}>
            <input
              value={task.name}
              onChange={(e) => updateItem(task.id, { name: e.target.value })}
            />
            <button onClick={() => deleteItem(task.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
