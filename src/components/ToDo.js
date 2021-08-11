import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
// let unsub = () => {};
export default function ToDo({ user }) {
  const [text, setText] = useState("");
  const [mytodos, setTodos] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    if (user) {
      const docref = await db.collection("todos").doc(user.uid).get();

      if (docref.exists) {
        setTodos(docref.data().todos);
      } else history.push("./login");
    }
    // return unsub();
  }, [user]);
  const addTodo = () => {
    console.log("add");
    db.collection("todos")
      .doc(user.uid)
      .set({ todos: [...mytodos, text] });
    setTodos([...mytodos, text]);
  };

  const deletetodo = async (deletetodo) => {
    const ref = db.collection("todos").doc(user.uid);
    const result = await ref.get();
    const res = result.data().todos.filter((toDo) => toDo !== deletetodo);
    console.log(res);
    setTodos(res);
    ref.update({ todos: res });
  };
  return (
    <div className="container">
      <h1>Add ToDos</h1>
      <div className="input-field">
        <input
          placeholder="Add ToDos"
          value={text}
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button type="submit" className="btn blue" onClick={addTodo}>
        Add
      </button>
      <ul className="collection">
        {mytodos.map((todo) => {
          return (
            <li className="collection-item" key={todo}>
              {todo}
              <i
                className="material-icons right"
                onClick={() => {
                  deletetodo(todo);
                }}
              >
                delete
              </i>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
