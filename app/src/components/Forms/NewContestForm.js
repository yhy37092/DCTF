import React, {useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'
import SimpleMDE from 'react-simplemde-editor'
import {useTranslation} from "react-i18next";

export default ({onSubmit}) => {
    const {t} = useTranslation();
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
                    <Form.Label>{t('description.Type')}</Form.Label>
                    {
                        ['Jeopardy', 'AWD'].map((type) => (
                            <Form.Check type={'radio'} name={'type'} label={t(`description.${type}`)} key={type}
                                        defaultChecked={type === 'Jeopardy'}
                                        onClick={() => setContestType(type)}/>
                        ))
                    }
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Name')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.name_of_contest')}</Form.Text>
                        <Form.Control key='name' type='text' value={name}
                                      placeholder={t('description.Enter_contest_name')}
                                      onChange={event => setName(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Fee')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.fee_of_contest')}</Form.Text>
                        <Form.Control type='number' value={fee}
                                      placeholder={t('description.Enter_contest_fee')}
                                      onChange={event => setFee(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Start')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.start_of_contest')}</Form.Text>
                        <DateTimePicker onChange={setStart} value={start}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.End')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.end_of_contest')}</Form.Text>
                        <DateTimePicker onChange={setEnd} value={end}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Message')}:</Form.Label>
                        <Form.Text as={Row} muted>{t('description.message_of_contest')}</Form.Text>
                        <SimpleMDE value={message} onChange={setMessage}/>
                    </Form.Group>

                    <Form.Group>
                        <Button className='float-end' variant='primary' type='submit'>{t('description.Create')}</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}