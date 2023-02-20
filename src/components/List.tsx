import { listType } from "../App";
import { FaEdit, FaTrash } from "react-icons/fa";

interface listItems {
  items: listType[];
  deleteItem: (id: string) => void;
  editItem: (id: string) => void;
}

export const List = ({ items, deleteItem, editItem}: listItems) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { title, id } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button type="button" className="edit-btn" 
              onClick={()=> editItem(id)}>
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => {
                  deleteItem(id);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};
