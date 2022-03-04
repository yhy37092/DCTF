import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Col, Form, Row} from "react-bootstrap";

export default ({onSubmit, data}) => {
    const {t} = useTranslation();
    const [IP, setIP] = useState('')
    const [Port, setPort] = useState(0)
    const [Flag_SSH_Port, setFlag_SSH_Port] = useState(0)
    const [Flag_SSH_User_Name, setFlag_SSH_User_Name] = useState('')
    const [Flag_SSH_Password, setFlag_SSH_Password] = useState('')

    useEffect(() => {
        setIP(data.info.ip)
        setPort(data.info.port)
        setFlag_SSH_Port(data.info.Flag_SSH_Port)
        setFlag_SSH_User_Name(data.info.Flag_SSH_User_Name)
        setFlag_SSH_Password(data.info.Flag_SSH_Password)
    }, [data])
    return (
        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit({
                _data: [IP, Port, Flag_SSH_Port, Flag_SSH_User_Name, Flag_SSH_Password]
            })
        }
        }>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.IP')}:</Form.Label>
                        <Form.Control type='text' value={IP}
                                      placeholder={t('description.Enter_challenge_name')}
                                      onChange={event => setIP(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Port')}:</Form.Label>
                        <Form.Control type='text' value={Port}
                                      placeholder={t('description.Port')}
                                      onChange={event => setPort(parseInt(event.target.value))}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Flag_SSH_Port')}:</Form.Label>
                        <Form.Control type='text' value={Flag_SSH_Port}
                                      placeholder={t('description.Flag_SSH_Port')}
                                      onChange={event => setFlag_SSH_Port(parseInt(event.target.value))}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Flag_SSH_User_Name')}:</Form.Label>
                        <Form.Control type='text' value={Flag_SSH_User_Name}
                                      placeholder={t('description.Flag_SSH_User_Name')}
                                      onChange={event => setFlag_SSH_User_Name(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Flag_SSH_Password')}:</Form.Label>
                        <Form.Control type='text' value={Flag_SSH_Password}
                                      placeholder={t('description.Flag_SSH_Password')}
                                      onChange={event => setFlag_SSH_Password(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Button className='float-end' variant='primary' type='submit'>{t('description.Update')}</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form>)

}