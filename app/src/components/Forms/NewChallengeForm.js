import React, {useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import SimpleMDE from 'react-simplemde-editor'
import {useTranslation} from "react-i18next";

export default ({onSubmit}) => {
    const {t} = useTranslation();
    const [challengeType, setChallengeType] = useState('standard')
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')
    const [connectionInfo, setConnectionInfo] = useState('')
    const [file, setFile] = useState('')
    const [hint, setHint] = useState('')
    const [value, setValue] = useState(0)

    return (
        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit({
                _data: [challengeType, name, category, message, connectionInfo, file, hint, value]
            })
        }
        }>
            <Row>
                <Col md={4}>
                    <Form.Label>{t('description.Type')}</Form.Label>
                    {
                        ['standard'].map((type) => (
                            <Form.Check type={'radio'} name={'type'} label={type} key={type}
                                        defaultChecked={type === 'standard'}
                                        onClick={() => setChallengeType(type)}/>
                        ))
                    }
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Name')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.name_of_challenge')}</Form.Text>
                        <Form.Control type='text' value={name}
                                      placeholder={t('description.Enter_challenge_name')}
                                      onChange={event => setName(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Category')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.category_of_challenge')}</Form.Text>
                        <Form.Control type='text' value={category}
                                      placeholder={t('description.Enter_challenge_category')}
                                      onChange={event => setCategory(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Message')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.message_of_challenge')}</Form.Text>
                        <SimpleMDE value={message} onChange={setMessage}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Connection_Info')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.Connection_Info_of_challenge')}</Form.Text>
                        <Form.Control type='text' value={connectionInfo}
                                      placeholder={t('description.Enter_challenge_Connection_Info')}
                                      onChange={event => setConnectionInfo(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.File')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.file_of_challenge')}</Form.Text>
                        <Form.Control type='text' value={file}
                                      placeholder={t('description.Enter_challenge_file')}
                                      onChange={event => setFile(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Hint')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.hint_of_challenge')}</Form.Text>
                        <Form.Control type='text' value={hint}
                                      placeholder={t('description.Enter_challenge_hint')}
                                      onChange={event => setHint(event.target.value)}/>
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