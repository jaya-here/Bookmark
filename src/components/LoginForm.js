import React, { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { fetchUser, sendUserData } from '../utility/usercrud';

function LoginForm({isRegistered, setIsRegistered, setIsLoggedIn}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cusername,setCusername] =useState('')
  const [cpassword, setCpassword]= useState('')
  const [isError, setIsError] = useState(false)
  const [userExist, setUserExist] = useState(false)

  function filterResult(result, parameter)
  {
    let user = result.filter((element)=>element.user === parameter)
    return user
  }

  async function handleSignUp() {
    let result = await fetchUser()
    let user = filterResult(result, cusername)
    if (user.length>0) //verify there are no users with the same username
    {
        setUserExist(true)
    }
    else
    {
    sendUserData({user:cusername,password:cpassword})
    setCusername('')
    setCpassword('')
    setIsRegistered(true)
    userExist(false)
    }
    //send a POST to API with signup details
    
  }

  async function handleLoginIn() {
    let result = await fetchUser()
    let user = filterResult(result, username)
    if (user.length <=0 || user[0].password !== password) //verify user exists and password is correct
    {
        setIsError(true)
    }
    else
    {
        setIsError(false)
        setIsLoggedIn(true)
    }
    
  }
  return (
    <div className='text-gray-100 flex flex-col items-center ' style={{height:'100vh', paddingTop:'10%'}}>
   {
    (isRegistered) && (<>
    <h1 className='text-center mb-4'>Login In</h1>
       <Form name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    autoComplete="off"
  >
    <Form.Item
      label={<label style={{ color: "ivory" }}>Username</label>}
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input value={username} className='text-blue-400' onChange={(e)=>{setUsername(e.target.value)}}/>
    </Form.Item>

    <Form.Item
      label={<label style={{ color: "ivory" }}>Password</label>}
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password className='text-blue-400 bg-gray-100' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <div className='text-gray-100 hover:underline mb-4' onClick={()=>{setIsRegistered(false)
        setIsError(false)}}>Don't have an account ?</div>
      <Button type="primary" className='bg-gray-100 text-gray-900' onClick={handleLoginIn}>
        Submit
      </Button>
    </Form.Item>
    


  </Form>
    </>)}

   {(!isRegistered && ((<>
    <h1 className='text-center mb-4'>Sign up</h1>
       <Form name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
      color:'white'
    }}
    initialValues={{
      remember: true,
    }}
    autoComplete="off"
  >
    <Form.Item
      label={<label style={{ color: "ivory" }}>Username</label>}
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input className='text-blue-400' value={cusername} onChange={(e)=>{setCusername(e.target.value)}}/>
    </Form.Item>

    <Form.Item
      label={<label style={{ color: "ivory" }}>Password</label>}
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password className='bg-gray-100 text-blue-400' value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}} />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" className='bg-gray-100 text-gray-900' onClick={handleSignUp}>
        Submit
      </Button>
    </Form.Item>
    


  </Form>
    </>)))
   }
   {(isError)&&<div className='text-red-400 text-center'>Something Wrong! Try Again</div>}
   {(userExist)&&<div className='text-red-400 text-center'>Username taken</div>}
   </div>
  )
}

export default LoginForm