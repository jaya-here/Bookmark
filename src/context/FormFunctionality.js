import React, { createContext } from 'react'
import { useContext, useState } from 'react'

let PrevForm = createContext()
export function usePrevFormData() {
    return useContext(PrevForm)
}



function FormFunctionalityContext(props) {
  const [newForm, setNewForm] = useState(true)
  const [prevObj,setPrevObj] = useState({})
  const [refresh, setRefresh] = useState(false)
  
  function handleRefresh()
{
    setTimeout(()=>{setRefresh((prev)=>(!prev))},1000)
}

  return (
    <PrevForm.Provider value={{newForm,prevObj,setNewForm,setPrevObj, refresh, handleRefresh}}>
        {props.children}
    </PrevForm.Provider>
  )
}

export default FormFunctionalityContext