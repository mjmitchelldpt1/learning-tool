import React from 'react'
import LessonItem from './LessonItem'
import { useContext } from 'react'
import LessonContext from '../context/LessonContext'
import Randy from '../pages/Randy'


function LessonList() {
  const { lesson, isLoading } = useContext(LessonContext)
  
  if(!isLoading && (!lesson || lesson.length === 0)) {
    return <Randy />
  }

  return isLoading ? (
  <Randy />) : (
    <div className="">
        {lesson.map((item) =>  
           <LessonItem 
            key={item.id} 
            item={item}
             />
        )}
    </div>
)}

export default LessonList