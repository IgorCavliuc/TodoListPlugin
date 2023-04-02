import './index.css'
import React, { useState } from "react";

const TodoItem = ({ title, id, changeDelete, changeUpdate }) => {
    const [editMode, setEditMode] = useState(false);
    const [updateValue, setUpdateValue] = useState(title);

    const handleUpdate = () => {
        if (updateValue.trim() !== "") {
            changeUpdate(updateValue, updateValue.trim());
        }
        setEditMode(false);
    };

    return (
        <div className='todo-list--ui__item'>
            {editMode ? (
                <>
                    <input
                        value={updateValue}
                        onChange={(e) => setUpdateValue(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <p>{title}</p>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </>
            )}
            <button onClick={changeDelete}>Delete</button>
        </div>
    );
};

export default TodoItem;
