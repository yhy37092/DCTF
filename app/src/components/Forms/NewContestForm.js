import React, {useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'
import SimpleMDE from 'react-simplemde-editor'

export default ({onSubmit}) => {

    const [contestType, setContestType] = useState('Jeopardy')
    const [name, setName] = useState('')
    const [fee, setFee] = useState(0)
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [message, setMessage] = useState('')

    return (
        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit({
                _data: [contestType, name, fee, parseInt(start.getTime()/1000), parseInt(end.getTime()/1000), message]
            })
        }
        }>
            <Row>
                <Col md={3}>
                    <Form.Label>Challenge Types</Form.Label>
                    {
                        ['Jeopardy', 'Attack With Defence'].map((type) => (
                            <Form.Check type={'radio'} name={'type'} label={type} key={type}
                                        defaultChecked={type === 'Jeopardy'}
                                        onClick={() => setContestType(type)}/>
                        ))
                    }
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label as={Row}>Name:</Form.Label>
                        <Form.Text as={Row} muted>The name of your challenge</Form.Text>
                        <Form.Control key='name' type='text' value={name}
                                      placeholder='Enter contest name'
                                      onChange={event => setName(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>Fee:</Form.Label>
                        <Form.Text as={Row} muted>The fee of your contest</Form.Text>
                        <Form.Control type='number' value={fee}
                                      placeholder='Enter contest fee'
                                      onChange={event => setFee(event.target.value)}/>
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
                        <Button className='float-end' variant='primary' type='submit'>Create</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}