import { useState, useEffect } from "react"; // Import React hooks for state and lifecycle management
import Navbar from "./components/Navbar"; // Import Navbar component
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs
import { FaEdit } from "react-icons/fa"; // Import edit icon
import { AiFillDelete } from "react-icons/ai"; // Import delete icon

function App() {
  // State to manage current text input
  const [todo, setTodo] = useState("");

  // State to manage list of todos
  // Retrieves todos from local storage or initializes an empty array if none present
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  // State to control whether finished todos are shown or hidden
  const [showFinished, setshowFinished] = useState(true);

  // useEffect hook to persist todos in local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function to toggle visibility of finished todos
  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  // Function to handle editing a todo:
  // Finds the todo by its ID, sets the current text input to this todo's text,
  // and then removes it from the list (so it can be re-added after editing)
  const handleEdit = (e, id) => {
    const t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  // Function to delete a todo by removing it from the todos state array
  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  // Function to add a new todo:
  // Generates a unique id for the todo, then adds it to the todos state array
  // Also resets the text input to an empty string after adding
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  // Function to update the text input controlled by the todo state
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Function that toggles the isCompleted status of a todo when its checkbox is changed
  const handlecheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar /> {/* Display the navigation bar */}
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-cyan-100 min-h-[80vh] md:w-1/2 ">
        <h1 className="text-3xl font-bold text-center">
          Nask - Manage your todos at one place{" "}
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
            {/* Input field for new todo text */}
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Must be 4 or more than 4 letters"
              className="w-full py-1 rounded-md px-5"
            />
            {/* Button to add new todo. Disabled if text length is 3 or less */}
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-cyan-800 disabled:bg-cyan-700 mx-2 hover:bg-cyan-950 text-white text-sm font-bold py-2 rounded-md p-4"
            >
              Save
            </button>
          </div>
        </div>
        {/* Checkbox to toggle display of completed todos */}
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          className="my-4"
          id="show"
        />{" "}
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        {/* A horizontal line divider */}
        <div className="h-[1px] opacity-15 bg-black mx-auto w-[90%] my-2 "></div>
        <h1 className="text-2xl font-bold">Your Todos</h1>
        <div className="todos">
          {/* Message if there are no todos */}
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            // Only display a todo if it's either not completed or showFinished is true
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex w-full justify-between my-3"
                >
                  <div className="flex gap-5">
                    {/* Checkbox to mark todo as completed */}
                    <input
                      onChange={handlecheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                    />
                    {/* Todo text with line-through styling if completed */}
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons h-full flex">
                    {/* Button to edit a todo */}
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-cyan-800 hover:bg-cyan-950 text-white p-2 text-sm font-bold py-1 rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    {/* Button to delete a todo */}
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-cyan-800 hover:bg-cyan-950 text-white p-2 text-sm font-bold py-1 rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
