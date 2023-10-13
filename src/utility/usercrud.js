export function sendUserData(userObj) {
    let result 
    async function sendUserDataToServer()
    {
     result = await fetch('https://crudcrud.com/api/bec9a842f06a4d69a76d21957daa7ca5/user',
     {
        headers: {
            "Content-Type":"application/json"
          },
          method:'POST',
          body: JSON.stringify(userObj)
     })
    
    }
    return sendUserDataToServer()
}

export function fetchUser() {
    async function getResponseFromServer()
    {
     let result = await fetch('https://crudcrud.com/api/bec9a842f06a4d69a76d21957daa7ca5/user')
     let data = await result.json()
     return data
    }
    return getResponseFromServer()
}

