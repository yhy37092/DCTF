import React, {useEffect, useState} from 'react'
import {Button, Form, Row} from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'
import SimpleMDE from 'react-simplemde-editor'

export default ({onSubmit, data}) => {

    const [contestType, setContestType] = useState('')
    const [name, setName] = useState('')
    const [fee, setFee] = useState(0)
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [message, setMessage] = useState('')

    useEffect(() => {
        setContestType(data.info.contestType)
        setName(data.info.name)
        setFee(data.info.fee)
        setStart(new Date(parseInt(data.info.start) * 1000))
        setEnd(new Date(parseInt(data.info.end) * 1000))
        setMessage(data.info.message)
    }, [data])

    return (
        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit({
                _data: [contestType, name, fee, start.getTime() / 1000, end.getTime() / 1000, message]
            })
        }
        }>
            <Form.Group>
                <Form.Label as={Row}>Name:</Form.Label>
                <Form.Text as={Row} muted>The name of your challenge</Form.Text>
                <Form.Group type='text' value={name}
                            placeholder='Enter contest name'
                            onChange={event => setName(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label as={Row}>Fee:</Form.Label>
                <Form.Text as={Row} muted>The fee of your contest</Form.Text>
                <Form.Group type='number' value={fee}
                            placeholder='Enter contest fee'
                            onChange={event => setFee(parseInt(event.target.value))}/>
            </Form.Group>
            <Form.Group>
                <Form.Label as={Row}>Start:</Form.Label>
                <Form.Text as={Row} muted>This is the time your contest start.</Form.Text>
                <DateTimePicker onChange={setStart} value={start}/>
            </Form.Group>
            <Form.Group>
                <Form.Label as={Row}>End:</Form.Label>
                <Form.Text as={Row} muted>This is the time your contest end.</Form.Text>
                <DateTimePicker onChange={setEnd} value={end}/>
            </Form.Group>
            <Form.Group>
                <Form.Label as={Row}>Message:</Form.Label>
                <Form.Text as={Row} muted>Use this to give a brief introduction to your
                    contest.</Form.Text>
                <SimpleMDE value={message} onChange={setMessage}/>
            </Form.Group>

            <Form.Group>
                <Button className='float-end' variant='primary' type='submit'>Update</Button>
            </Form.Group>
        </Form>
    )
}