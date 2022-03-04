import React, {useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import SimpleMDE from 'react-simplemde-editor'
import {useTranslation} from "react-i18next";

export default ({onSubmit}) => {
    const {t} = useTranslation();
    const [challengeType] = useState('AWD')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [value, setValue] = useState(0)

    return (
        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit({
                _data: [challengeType, name, challengeType, message, '', '', '', value]
            })
        }
        }>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Name')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.name_of_challenge')}</Form.Text>
                        <Form.Control type='text' value={name}
                                      placeholder={t('description.Enter_challenge_name')}
                                      onChange={event => setName(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Message')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.message_of_challenge')}</Form.Text>
                        <SimpleMDE value={message} onChange={setMessage}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Value')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.value_of_challenge')}</Form.Text>
                        <Form.Control type='number' value={value}
                                      onChange={event => setValue(parseInt(event.target.value))}/>
                    </Form.Group>

                    <Form.Group>
                        <Button className='float-end' variant='primary' type='submit'>{t('description.Create')}</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}