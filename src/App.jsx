import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  saveTodo,
  updateTodo,
} from "./redux/slice/todosSlice";
import { useState } from "react";

function App() {
  const state = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const [selectedId, setSelectedId] = useState(null);

  const [newText, setNewText] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    let inputValue = e.target[0].value;

    let todoObject = {
      text: inputValue,
      checked: false,
      id: Date.now(),
    };

    dispatch(addTodo(todoObject));
    e.target[0].value = "";
  };

  const editTodo = (id) => {
    setSelectedId(id);
  };

  const saveTodoFunc = (id, text) => {
    dispatch(saveTodo({ id, text }));
    setSelectedId(null);
  };

  console.log(selectedId);

  return (
    <>
      <div className="main">
        <div className="wrapper">
          <p className="title">To Do List 📝</p>

          <form className="main__form" onSubmit={(e) => submitForm(e)}>
            <input
              type="text"
              className="main__input"
              placeholder="Enter new todo ..."
            />

            <input type="submit" className="main__submit" value="Add" />
          </form>

          <div className="tasks">
            {state.list.length > 0 ? (
              state.list.map((todo) => (
                <div
                  key={todo.id}
                  className={todo.checked ? "checkTask" : "task"}
                >
                  <input
                    onChange={() => dispatch(updateTodo(todo.id))}
                    type="checkbox"
                    className="task__checkbox"
                  />

                  {selectedId === todo.id ? (
                    <input
                      onChange={(e) => setNewText(e.target.value)}
                      type="text"
                      defaultValue={todo.text}
                      className="newTask"
                    />
                  ) : (
                    <p className="task__name">{todo.text}</p>
                  )}

                  <div className="task__box">
                    {selectedId === todo.id ? (
                      <MdSave
                        className="saveTodo"
                        title="save"
                        onClick={() => saveTodoFunc(todo.id, newText)}
                      />
                    ) : (
                      <MdEdit
                        className="task__edit"
                        title="edit"
                        onClick={() => editTodo(todo.id)}
                      />
                    )}

                    <MdDelete
                      className="task__delete"
                      onClick={() => dispatch(deleteTodo(todo.id))}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="nodata">No data available !</p>
            )}
          </div>

          <a href="https://t.me/mrmarcusedev">
            <p className="copy">© 2024 My Website. All rights reserved.</p>
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
