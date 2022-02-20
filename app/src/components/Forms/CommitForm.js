import React, {useEffect, useState} from 'react'
import {Button, Form} from 'react-bootstrap'

export default ({onSubmit, data}) => {

    const [flag, setFlag] = useState('')
    useEffect(() =>
        setFlag(data), [data])

    return (

        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit(
                {
                    _data: flag
                }
            )
        }}>
            <Form.Control placeholder='flag' onChange={event => setFlag(event.target.value)} value={flag}/>
            <Button variant='primary' type='submit'>Commit</Button>
        </Form>
    )
}