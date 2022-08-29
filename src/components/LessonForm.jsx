import { useState, useContext, useEffect } from 'react';
import Button from './shared/Button';
import LessonContext from '../context/LessonContext';
import PropTypes from 'prop-types';

function LessonForm() {
  const { addLesson, lessonEdit, updateLesson } = useContext(LessonContext);

  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [reflect, setReflect] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // check to make sure we should run useEffect first
    if(lessonEdit.edit === true) {
    setBtnDisabled(false)
    setTopic(lessonEdit.item.topic)
    setContent(lessonEdit.item.content)
    setReflect(lessonEdit.item.reflect)
    }
    },
    //with an empty array it only loads when the web page loads
    // lesson edit runs whenever yo click on edit 
    [lessonEdit])

  const handleTopicText = (event) => {
    setTopic(event.target.value);
  };
  const handleContentText = (event) => {
    setContent(event.target.value);
  };
  const handleReflectText = (event) => {
    setReflect(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (topic.length >= 2 && content.length >= 2 && reflect.length >= 2) {
      setBtnDisabled(false);
      setMessage(null);
      const newLesson = {
        topic,
        content,
        reflect,
      };
      if (lessonEdit.edit === true) {
        updateLesson(lessonEdit.item.id, newLesson);
      } else {
        addLesson(newLesson);
      }

      setBtnDisabled(true);
      setTopic('');
      setContent('');
      setReflect('');
    } else {
      setMessage('All 3 boxes must have 2 characters');
    }
  };
  return (
    <div className='card' style={lessonEdit.edit ? {backgroundColor:'cadetblue'}:{backgroundColor:'white'}}>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <input
            type='text'
            placeholder='Topic of focus'
            value={topic}
            onChange={handleTopicText}
          ></input>
        </div>
        <div className='input-group'>
          <textarea
            type='text'
            placeholder='Content learned'
            value={content}
            onChange={handleContentText}
          ></textarea>
        </div>
        <div className='input-group'>
          <textarea
            type='text'
            placeholder='Reflect on improvement'
            value={reflect}
            onChange={handleReflectText}
          ></textarea>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'center' }}
          className='container'
        >
          <Button disabled={btnDisabled} style={{backgroundColor:'red'}}>{lessonEdit.edit ? 'EDIT': 'Submit' }</Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </div>
  );
}

LessonForm.propTypes = {
  isDisabled: PropTypes.bool,
  topic: PropTypes.string,
  content: PropTypes.string,
  reflect: PropTypes.string,
};

export default LessonForm;

