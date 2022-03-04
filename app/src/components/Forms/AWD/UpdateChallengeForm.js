import React, {useEffect, useState} from 'react'
import {Button, Form, Row} from 'react-bootstrap'
import SimpleMDE from 'react-simplemde-editor'
import {useTranslation} from "react-i18next";

export default ({onSubmit, data}) => {
    const {t} = useTranslation();
    const [challengeType, setChallengeType] = useState('AWD')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [value, setValue] = useState('')

    useEffect(() => {
        setChallengeType(data.info.challengeType)
        setName(data.info.name)
        setMessage(data.info.message)
        setValue(data.info.value)
    }, [data])

    return (
        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit({
                _data: [challengeType, name, '', message, '', '', '', value]
            })
        }
        }>
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
                <Button className='float-end' variant='primary' type='submit'>{t('description.Update')}</Button>
            </Form.Group>
        </Form>
    )
}