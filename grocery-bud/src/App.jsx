import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


//getting value stored in local storage with key 'list'
const getLocalStorage = () => {
  let list = localStorage.getItem('list');

  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: '', type: ''})

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      //set alert
      setAlert({show: true, msg: 'Please enter value', type: 'danger'})
    } else if(name && isEditing) {
      setList(
        list.map((item) => {
          if(item.title === editID) {
            return {...item, title: name}
          }
          return item
        })
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      setAlert({msg: 'item updated', type: 'success', show: true})
    } else {
      setAlert({show: true, msg: 'Item added to the list', type: 'success'})
      const newItem = {
        id: new Date().getTime.toString(),
        title: name};
        setList([...list, newItem])
        setName('')
        // setIsEditing(false)
      }
  }

  const deleteItem = (title) => {
    setAlert({show: true, msg: 'Item removed', type: 'success'})   
    //filter function returns the objects witch are not matching title
    setList(list.filter((item) => item.title !== title)); 
  }

  const editItem = (title) => {
    // const specificItem = list.filter((item) => item.title === title);
    // setName(specificItem.title);
    setName(title);
    setIsEditing(true);
    setEditID(title);
  }

  //to store the values in the local storage even if we refresh
  //setting value in the list to local storage with key 'list'
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list]);
  
  return <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={() => setAlert({show: false, masg: '', type: ''})} />}
      <h3>Grocery Bud</h3>
      <div className='form-control'>
        <input type="text" className='grocery' placeholder='eg. Eggs' value={name} onChange={(e) => setName(e.target.value)} />
        <button type='submit' className='submit-btn'>
          {isEditing ? 'Edit' : 'Submit'}
        </button>
      </div>
    </form>
    <div className='grocery-container'>
      <List items={list} deleteItem={deleteItem} editItem={editItem} />
      <button className='clear-btn' onClick={() => setList([])}>clear items</button>
    </div>
  </section>
}

export default App