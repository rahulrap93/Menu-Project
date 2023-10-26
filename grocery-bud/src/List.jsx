/* eslint-disable react/prop-types */
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({items, deleteItem, editItem}) => {
  console.log(items);
  return <div className='grocery-list'>
    {items.map((item) => {
      return <article key={item.id} className='grocery-item'>
        <p className='title'>{item.title}</p>
        <div className="btn-container">
          <button className='edit-btn' onClick={() => editItem(item.title)}>
            <FaEdit />
          </button>
          <button onClick={() => deleteItem(item.title)} className='deleted-btn'>
            <FaTrash />
          </button>
        </div>
      </article>
    })}

  </div>
}

export default List