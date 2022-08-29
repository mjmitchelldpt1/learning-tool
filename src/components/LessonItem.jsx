import React from 'react';
import Card from './shared/Card';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';
import LessonContext from '../context/LessonContext';

function LessonItem({ item }) {
  const { editLesson, deleteLesson } = useContext(LessonContext)
  
    return (
    <Card>
      <button 
        className='close' 
        style={{ color: 'red' }} 
        value={item}
        //retrieve item.id from event and pass to handle delete function
        onClick={(event) => deleteLesson(item.id)}>
        <FaTimes />
      </button>
      <button className='edit' style={{ color: 'purple' }}
      onClick={(event) => editLesson(item)}>
        <FaEdit />
      </button>
      <h2>
        {item.topic} 
      </h2>
      <h3>Content</h3>
      <p>{item.content}</p>
      <br></br>
      <h3>Reflection</h3>
      <p>{item.reflect}</p>
    </Card>
  );
}

export default LessonItem;
