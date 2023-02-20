import { title } from "process";
import { useState, useEffect } from "react";
import "./App.css";
import { Alert } from "./components/Alert";
import { List } from "./components/List";

export interface listType {
  id: string;
  title: string;
}

function App() {

  const getLocalStorage =  () => {
    let storedList = localStorage.getItem('list');
    if(storedList !== null){
      return JSON.parse(storedList)
    }else{
      return []
    }
  }

  const [name, setName] = useState("");
  const [list, setList] = useState<listType[]>(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string>("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Please Enter Value", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId("");
      setIsEditing(false);
      showAlert(true, "Task Edited", "success");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      showAlert(true, "Task Added", "success");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "Empty List", "danger");
    setList([]);
  };

  const deleteItem = (id: string) => {
    showAlert(true, "Task Deleted", "danger");
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const editItem = (id: string) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    if (specificItem) {
      setEditId(specificItem.id);
      setName(specificItem.title);
    }
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  },[list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>TODO LIST</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. complete homework"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear Tasks
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
