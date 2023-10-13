import './App.css';
import './Sass/main.css'
import { useEffect, useRef, useState } from 'react';
import { handleAllGet} from './utility/crud';
import Bookmark from './components/Bookmark';
import CourseForm from './components/CourseForm'
import{ usePrevFormData } from './context/FormFunctionality';
import LoginForm from './components/LoginForm';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistered, setIsRegistered] = useState(true)
  const [courseArr, setCourseArr] = useState([])
  const {refresh} = usePrevFormData()
  const flag = useRef(true)
 
  useEffect(()=>{

    //fetching data to display in homepage
    async function handleOverview() {
      let result = await handleAllGet()
      setCourseArr(result)
  }
  
  handleOverview()
  
  flag.current = false
  
  }
  ,[refresh])

  return (
    <div>
    <div className='App darkTheme' style={{height:'100%'}}>
     {/*HomePage*/} 
    {(isLoggedIn) && <><CourseForm></CourseForm>
    <div className='flex justify-center pb-4 mt-6'>
    <div className='flex flex-col bookmarks w-4/5 sm-w-7/12 md:w-1/2 lg:w-4/12'>
    {(courseArr.length > 0) && 
    courseArr.map((element, index)=>{
      return <Bookmark
      id={element._id}
      selected={element.selected}
      topic={element.topic}
      name={element.name}
      description={element.description}
      link={element.link}
      key={element._id}></Bookmark>
    })}
    </div>
    </div></>}
    {/* Login-Page */}
    {(!isLoggedIn)&&<LoginForm
    isLoggedIn={isLoggedIn}
    isRegistered={isRegistered}
    setIsLoggedIn={setIsLoggedIn}
    setIsRegistered={setIsRegistered}></LoginForm>}
    </div>
    </div>
  );
}

export default App;
