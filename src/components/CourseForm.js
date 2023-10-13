import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { handlePostData, handleUpdateData } from '../utility/crud';
import { PlusOutlined } from '@ant-design/icons';
import { usePrevFormData } from '../context/FormFunctionality';
const CourseForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [name, setName] = useState('')
  const [selected, setSelected] = useState('low-priority')
  const [elementChange, setElementChange] = useState(' ')
  const {newForm, setNewForm} = usePrevFormData()
  const {prevObj, handleRefresh} = usePrevFormData()

  useEffect(()=>{
    if (!newForm)
    {
        setIsModalOpen(true) //opens modal for update hortcut form
    }
  },[newForm])

  const reference =  {
    topic,
    description,
    link,
    name,
    selected
  } //utility for update shortcut form

  const resetState = ()=>{
    setTopic('')
    setDescription('')
    setLink('')
    setSelected('low-priority')
    setName('')
  }


  const formElements = {
    topic: [<Form.Item label="Topic">
    <Input value={topic} onChange={(e)=>{handleChange(setTopic, e.target.value)}} />
  </Form.Item>],
    name: [ <Form.Item label="Title">
    <Input value={name} onChange={(e)=>{handleChange(setName, e.target.value)}} />
  </Form.Item>],
    description: [ <Form.Item label="Description">
    <Input value={description} onChange={(e)=>{handleChange(setDescription, e.target.value)}}/>
  </Form.Item>
    ],
    link: [     <Form.Item label="Link">
    <Input value={link} onChange={(e)=>{handleChange(setLink, e.target.value)}}/>
  </Form.Item>],
    selected: [ <Form.Item label="Select">
    <Select value={selected}
    onChange={(e)=>{setSelected(e)}}>
      <Select.Option value="low-priority">Low priority</Select.Option>
      <Select.Option value="medium-priority">Medium priority</Select.Option>
      <Select.Option value="high-priority">High priority</Select.Option>
    </Select>
  </Form.Item>] 
 
  } //render the form element for the parameter to be updated

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handlePostData({topic, name, description, link,selected})
    resetState()
    setIsModalOpen(false);
    handleRefresh()
    
  };
  const handleCancel = () => {
    setElementChange('')
    setNewForm(true)
    setIsModalOpen(false);
    resetState()
  };
  const handleChange = (setChange, changevalue)=>{
    setChange(changevalue)
  }
  const handleSplOk =  ()=>{
    handleUpdateData(prevObj.id, {...prevObj,[elementChange]:reference[elementChange]})
    setElementChange('')
    resetState()
    setIsModalOpen(false);
    setNewForm(true)
    handleRefresh()

  }
  const footer = [
    <Button key="back" onClick={handleCancel}>
      Return
    </Button>,
    <Button key="submit" className='bg-blue-500' type="primary" onClick={(newForm)?handleOk:handleSplOk}>
      Submit
    </Button>
  ]
  return (
    <>
     <div className='w-full overflow-hidden flex justify-center ' onClick={showModal}><Button className='m-2 px-1 py-0 rounded-full w-24 bg-slate-200'><PlusOutlined className='text-blue-400 text-1xl transform-translate plus-button'></PlusOutlined>Add new</Button></div>
    {(newForm) && <Modal className='text-gray-900' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
      footer={footer}>
        {/*new shortcut form*/}
        <h4>What shortcut you want to create?</h4>
        <Form>
        <Form.Item label="Topic">
          <Input value={topic} onChange={(e)=>{handleChange(setTopic, e.target.value)}} />
        </Form.Item>
        <Form.Item label="Title">
          <Input value={name} onChange={(e)=>{handleChange(setName, e.target.value)}} />
        </Form.Item>
        <Form.Item label="Description">
          <Input value={description} onChange={(e)=>{handleChange(setDescription, e.target.value)}}/>
        </Form.Item>
        <Form.Item label="Link">
          <Input value={link} onChange={(e)=>{handleChange(setLink, e.target.value)}}/>
        </Form.Item>
        <Form.Item label="Select">
          <Select value={selected}
          onChange={(e)=>{setSelected(e)}}>
            <Select.Option value="low-priority">Low priority</Select.Option>
            <Select.Option value="medium-priority">Medium priority</Select.Option>
            <Select.Option value="high-priority">High priority</Select.Option>
          </Select>
        </Form.Item>
        </Form>
      </Modal>}
    
     {/*Shorcut Update form*/}
      {!(newForm) && <Modal className='text-gray-900' open={isModalOpen} onOk={handleSplOk} onCancel={handleCancel}
      footer={footer}>
        <h4>What shortcut you want to update?</h4>
        <Form>
        <Select style={{width:'7rem'}} value={elementChange}
          onChange={(e)=>{setElementChange(e)}}>
            <Select.Option value="">Choose</Select.Option>
            <Select.Option value="topic">Topic</Select.Option>
            <Select.Option value="name">Title</Select.Option>
            <Select.Option value="description">Description</Select.Option>
            <Select.Option value="link">Link</Select.Option>
            <Select.Option value="selected">Priority</Select.Option>
          </Select>
          {elementChange.length > 0 && formElements[elementChange]}
        </Form>
      </Modal>}
    </>
  );
};
export default CourseForm;