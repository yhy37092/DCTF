import React, {useEffect, useState} from 'react'
import {Button, Form, Row} from 'react-bootstrap'
import SimpleMDE from 'react-simplemde-editor'

export default ({onSubmit, data}) => {

    const [challengeType, setChallengeType] = useState('')
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')
    const [connectionInfo, setConnectionInfo] = useState('')
    const [file, setFile] = useState('')
    const [hint, setHint] = useState('')
    const [value, setValue] = useState('')

    useEffect(() => {
        setChallengeType(data.info.challengeType)
        setName(data.info.name)
        setCategory(data.info.category)
        setMessage(data.info.message)
        setConnectionInfo(data.info.connectionInfo)
        setFile(data.info.file)
        setHint(data.info.hint)
        setValue(data.info.value)
    }, [data])

    return (
        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit({
                _data: [challengeType, name, category, message, connectionInfo, file, hint, value]
            })
        }
        }>
            <Form.Group>
                <Form.Label as={Row}>Name:</Form.Label>
                <Form.Text as={Row} muted>The name of your challenge</Form.Text>
                <Form.Control type='text' value={name}
                              placeholder='Enter challenge name'
                              onChange={event => setName(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label as={Row}>Category:</Form.Label>
                <Form.Text as={Row} muted>The category of your challenge</Form.Text>
                <Form.Control type='text' value={category}
                              placeholder='Enter challenge category'
                              onChange={event => setCategory(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label as={Row}>Message:</Form.Label>
                <Form.Text as={Row} muted>Use this to give a brief introduction to your
                    challenge.</Form.Text>
                <SimpleMDE value={message} onChange={setMessage}/>
            </Form.Group>
            {console.log(data)}
            <Form.Group>
                <Form.Label as={Row}>Connection Info:</Form.Label>
                <Form.Text as={Row} muted>The connection info of your challenge</Form.Text>
                <Form.Control type='text' value={connectionInfo}
                              placeholder='Enter challenge connection info'
                              onChange={event => setConnectionInfo(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label as={Row}>File URL:</Form.Label>
                <Form.Text as={Row} muted>The files of your challenge</Form.Text>
                <Form.Control type='text' value={file}
                              placeholder='Enter challenge hint'
                              onChange={event => setFile(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label as={Row}>Hint:</Form.Label>
                <Form.Text as={Row} muted>The hint of your challenge</Form.Text>
                <Form.Control type='text' value={hint}
                              placeholder='Enter challenge hint'
                              onChange={event => setHint(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label as={Row}>Value:</Form.Label>
                <Form.Text as={Row} muted>This is how many points are rewarded for solving this
                    challenge.</Form.Text>
                <Form.Control type='number' value={value}
                              onChange={event => setValue(parseInt(event.target.value))}/>
            </Form.Group>

            <Form.Group>
                <Button className='float-end' variant='primary' type='submit'>Update</Button>
            </Form.Group>
        </Form>
    )
}