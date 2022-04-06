import React, {useState} from 'react'
import {Button, Col, Form, InputGroup, Row} from 'react-bootstrap'
import SimpleMDE from 'react-simplemde-editor'
import {useTranslation} from "react-i18next";
import aes from "crypto-js/aes";
import utf8 from "crypto-js/enc-utf8";

export default ({onSubmit}) => {
    const {t} = useTranslation();
    const [challengeType] = useState('Jeopardy')
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')
    const [connectionInfo, setConnectionInfo] = useState('')
    const [file, setFile] = useState('')
    const [hint, setHint] = useState('')
    const [value, setValue] = useState('0')
    const [key, setKey] = useState('')
    const [enc, setEnc] = useState(false);
    return (
        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit({
                _data: [challengeType, name, category, message, connectionInfo, file, hint, value]
            })
        }
        }>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.key')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.encKey')}</Form.Text>
                        <InputGroup>
                            <Form.Control placeholder={t('description.Enter_encKey')}
                                          onChange={event => setKey(event.target.value)} value={key}/>
                            <Button variant='primary' type="button" onClick={() => {
                                setKey(Math.random().toString(36))
                            }}>Generate</Button>
                            <Button variant='primary' type="button" onClick={() => {
                                if (!enc) {
                                    try {
                                        setName(aes.encrypt(name, key).toString())
                                        setCategory(aes.encrypt(category, key).toString())
                                        setMessage(aes.encrypt(message, key).toString())
                                        setConnectionInfo(aes.encrypt(connectionInfo, key).toString())
                                        setFile(aes.encrypt(file, key).toString())
                                        setHint(aes.encrypt(hint, key).toString())
                                    } catch (e) {
                                        alert(e)
                                    }
                                    setEnc(true)
                                }
                            }}>Encrypt</Button>
                            <Button variant='primary' type="button" onClick={() => {
                                if (enc) {
                                    try {
                                        setName(aes.decrypt(name, key).toString(utf8))
                                        setCategory(aes.decrypt(category, key).toString(utf8))
                                        setMessage(aes.decrypt(message, key).toString(utf8))
                                        setConnectionInfo(aes.decrypt(connectionInfo, key).toString(utf8))
                                        setFile(aes.decrypt(file, key).toString(utf8))
                                        setHint(aes.decrypt(hint, key).toString(utf8))
                                    } catch (e) {
                                        alert(e)
                                    }
                                    setEnc(false)
                                }
                            }}>Decrypt</Button>
                        </InputGroup>
                    </Form.Group>
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
                                      onChange={event => setValue(event.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Button className='float-end' variant='primary' type='submit'>{t('description.Create')}</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}