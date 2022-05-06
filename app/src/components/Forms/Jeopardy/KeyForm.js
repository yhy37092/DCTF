import React, {useState} from 'react'
import {Button, Form, InputGroup} from 'react-bootstrap'

export default ({onSubmit}) => {

    const [key, setKey] = useState('')

    return (

        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit(
                {
                    _data: key
                }
            )
        }}>
            <Form.Group>
                <InputGroup>
                    <Form.Control placeholder='key' onChange={event => setKey(event.target.value)} value={key}/>
                    <Button variant='primary' type='submit'>Update</Button>
                </InputGroup>
            </Form.Group>
        </Form>
    )
}