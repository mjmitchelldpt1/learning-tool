import './App.css';
import Header from './components/Header';
import LessonForm from './components/LessonForm';
import LessonList from './components/LessonList';
import {LessonProvider} from './context/LessonContext';

function App() {

  return (
    <LessonProvider>
      <Header />
        <div className='container'>
          <LessonForm />
          <LessonList />
        </div>
    </LessonProvider>
  );
}

export default App;
