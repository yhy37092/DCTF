import React, {useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'

export default ({onSubmit}) => {

    const [name, setName] = useState('');
    const [captain, setCaptin] = useState('');
    const [members, setMembers] = useState([]);
    const [count, setCount] = useState(0);

    return (

        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit(
                {
                    _data: [name, captain, members]
                }
            )
        }}>
            <Form.Label>team name</Form.Label>
            <Form.Control key='name' type='text' name='name' value={name} placeholder='Enter name'
                          onChange={event => setName(event.target.value)}/>
            <Form.Label>captain account</Form.Label>
            <Form.Control key='captain' type='text' name='captain' value={captain} placeholder='Enter captain'
                          onChange={event => setCaptin(event.target.value)}/>
            {
                members.map((member, index) => (
                    <div key={index + 1}>
                        <Form.Label>member {index + 1}</Form.Label>
                        <Form.Control type='text' name={index + 1} value={member} placeholder='Enter member account'
                                      onChange={event => {
                                          const tmp = members.slice();
                                          tmp[index] = event.target.value;
                                          setMembers(tmp);
                                      }}/>
                    </div>
                ))
            }
            <Row>
                <Col>
                    <Button className='float-start' key='Add member' variant='outline-secondary' type='button'
                            onClick={() => {
                                setCount(count + 1)
                                setMembers(members => [...members, ''])
                            }}>Add</Button>
                </Col>
                <Col>
                    <Button className='float-end' key='Delete member' variant='outline-secondary' type='button'
                            onClick={() => {
                                if (count > 0) {
                                    setCount(count - 1)
                                    const tmp = members.slice()
                                    tmp.splice(members.length - 1, 1)
                                    setMembers(tmp)
                                }
                            }}>sub</Button>
                </Col>
            </Row>
            <Button variant='primary' type='submit'>Submit</Button>
        </Form>
    )
}