import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../src/components/Loader'
import FormContainer from '../src/components/FormContainer'
import { useAddMutation } from '../src/slices/deviceApiSlice'

const AddDevice = () => {
  const [d_type, setDeviceType] = useState('')
  const [d_brand, setDeviceBrand] = useState('')
  const [d_model, setDeviceModel] = useState('')
  const [d_sn, setSerialNumber] = useState('')
  const [d_hostName, setHostName] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [add, {isLoading}] = useAddMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        const res = await add({
          d_type,
          d_brand,
          d_model,
          d_sn,
          d_hostName
        }).unwrap()
        dispatch(useAddMutation({...res}))
    }catch(err){
        toast.error(err?.data?.message || err.error)
    }
    navigate('/devices')
  }
  return (
    <>
        <FormContainer>
            <h1>New Device</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='my-2' controlId='d_type'>
                    <Form.Label>Type</Form.Label>
                    <Form.Control type='text' placeholder='Laptop'
                    value={d_type}
                    onChange={(e) => setDeviceType(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='d_brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' placeholder='Lenovo'
                    value={d_brand}
                    onChange={(e) => setDeviceBrand(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='d_model'>
                    <Form.Label>Model</Form.Label>
                    <Form.Control type='text' placeholder='L390'
                    value={d_model}
                    onChange={(e) => setDeviceModel(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='d_sn'>
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control type='text' placeholder='DKFUSS923D'
                    value={d_sn}
                    onChange={(e) => setSerialNumber(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='d_hostName'>
                    <Form.Label>Host Name</Form.Label>
                    <Form.Control type='text' placeholder='DKFUSS923D'
                    value={d_hostName}
                    onChange={(e) => setHostName(e.target.value)}></Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                <Button type='submit' variant='primary' className='mt-3'>
                    Add Device
                </Button>
            </Form>
        </FormContainer>
    </>
  )
}

export default AddDevice