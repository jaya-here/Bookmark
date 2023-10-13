export function handleAllGet() {
    async function getResponseFromServer()
    {
     let result = await fetch('https://crudcrud.com/api/bec9a842f06a4d69a76d21957daa7ca5/bookmark')
     let data = await result.json()
     return data
    }
    return getResponseFromServer()
  }

export function handlePostData(postObj) {
    async function sendPostToServer() 
    {
      let response = await fetch('https://crudcrud.com/api/bec9a842f06a4d69a76d21957daa7ca5/bookmark',
      {
        headers: {
          "Content-Type":"application/json"
        },
        method:'POST',
        body: JSON.stringify(postObj)
      })
    }
    sendPostToServer()
  }

export function handleUpdateData(id, updateObj) {
    async function updateDatainServer() 
    {
      try
      {
      let response = await fetch(`https://crudcrud.com/api/bec9a842f06a4d69a76d21957daa7ca5/bookmark/${id}`,
      {
        headers: {
          "Content-Type":"application/json"
        },
      method: 'PUT',
      body: JSON.stringify(updateObj)
      })
    }
    catch(err)
    {
      console.log(err)
    }
    }
    updateDatainServer()
    return true
  }

  export function handleDelete(id)
  {
    
    async function deleteFromServer()
    {
     let result = await fetch(`https://crudcrud.com/api/bec9a842f06a4d69a76d21957daa7ca5/bookmark/${id}`, {
        method:'DELETE'
     })
    
    }
    deleteFromServer(id)
  }