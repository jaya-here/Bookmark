import React from 'react'
import { usePrevFormData } from '../context/FormFunctionality'
import { handleDelete } from '../utility/crud'
import { Button } from 'antd'

function Bookmark({id, topic,name,link,description,selected }) {
  const {setPrevObj, setNewForm, handleRefresh} = usePrevFormData()

  //takes to the bookmarked site
  function reDirectToExternalSite(url)
  {
   console.log(url)
   window.open(url, '_blank')
  }

  function Update()
  {
    setPrevObj({id, topic, name, link, description, selected}) //storing previousState to send to API along with updated data
    setNewForm(false) //opens shortcut modal
  }

  function Delete() 
  {
    handleDelete(id) //sends DELETE request
    handleRefresh() //Refresh Homepage
    
  }

  return (
    <div className='bookmark'>
        {/* Card-header*/}  
        <div className='relative'>
        <div onClick={()=>{reDirectToExternalSite(link)}}
         className='flex justify-center 
         items-center border border-solid
          border-gray-400 rounded-sm 
          topic-header uppercase' style={{height:'10rem'}}>
            <h1 className='text-5xl bookmark__heading'>{topic}</h1>
        </div>
        <div className='absolute' style={{bottom:'0.5rem',right:'0.5rem',zIndex:10}}>
        <Button className='bg-gray-100 text-grey-900 shadow-md mr-3' onClick={Update}>Update</Button>
        <Button className='bg-gray-100 text-grey-900 shadow-md' onClick={Delete}>Delete</Button>
        </div>
        </div>
        
        {/* Card-title */}
        <div>
        <h4 className='font-bold tracking-wider pr-1 mt-1 color-white'>{name}</h4>

        </div>
        {/* Description information */}
        <div>
        <p className='text-xs py-1'>{description}</p>
        </div>

    </div>
  )
}

export default Bookmark