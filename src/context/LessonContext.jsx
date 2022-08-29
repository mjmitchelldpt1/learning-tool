import { createContext, useState, useEffect } from 'react';

const LessonContext = createContext();

export function LessonProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true)
  
    //state needs to return an empty array so the data has a home
    const [lesson, setLesson] = useState([]);
  //creat useEffect that fetch's and loads the data once
  useEffect(() => {
    //we call the fetch here because we only want to run it on page load
    fetchLesson()
    //catch errors
    .catch(console.error);
  }, []);

  const fetchLesson = async () => {
    //grab data from API db.json
    // http:// portion added from proxy in package.json
    const response = await fetch('/lesson?_sort=id&_order=desc');
    // convert data to JSON
    const data = await response.json();

    //set State with results of fetchData
    setLesson(data)
    setIsLoading(false)
  };

 


  const [lessonEdit, setLessonEdit] = useState({
    // take in an object we are editing - give this an empty item
    // this will pull the target edit event into this object
    item: {},
    //edit will be set to false if we click edit will be set to true
    edit: false,
  });

  const addLesson = async (newLesson) => {
    //get response from lesson, then written how you write POST add
    const response = await fetch('/lesson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
    },
    body: JSON.stringify(newLesson)
    })
    //gives us new item
    const data = await response.json()
    
    setLesson([data, ...lesson]);
  };

  const deleteLesson = async (id) => {
    //add id object and an object with method: DELETE
    if(window.confirm('Delete permanently?')) {
    await fetch(`/lesson/${id}`, { method: 'DELETE'})
    //filter out item by making new array w/o item and giving it to setLesson
    setLesson(lesson.filter((item) => item.id !== id));
  }};

  const editLesson = (item) => {
    setLessonEdit({
      item,
      edit: true,
    });
  };

  const updateLesson = async (id, updItem) => {
    const response = await fetch(`/lesson/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
    },
        body: JSON.stringify(updItem)
    })
    
    const data = await response.json()

    setLesson(
      lesson.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
    setLessonEdit(false)
  };

  return (
    <>
      <LessonContext.Provider
        value={{
          lesson,
          lessonEdit,
          isLoading,
          addLesson,
          deleteLesson,
          editLesson,
          updateLesson,
        }}
      >
        {children}
      </LessonContext.Provider>
    </>
  );
}

export default LessonContext;
