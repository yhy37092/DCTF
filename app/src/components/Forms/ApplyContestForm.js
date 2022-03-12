import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {useTranslation} from "react-i18next";

export default ({onSubmit,sender}) => {
    const {t} = useTranslation();
    const [name, setName] = useState('');
    const [captain, setCaptain] = useState('');
    const [members, setMembers] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {setCaptain(sender)},[sender])

    return (

        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit(
                {
                    _data: [name, captain, members]
                }
            )
        }}>
            <Form.Label>{t('description.team_name')}</Form.Label>
            <Form.Control key='name' type='text' name='name' value={name} placeholder={t('description.Enter_team_name')}
                          onChange={event => setName(event.target.value)}/>
            <Form.Label>{t('description.captain_account')}</Form.Label>
            <Form.Control key='captain' type='text' name='captain' value={captain} disabled
                          placeholder={t('description.Enter_account')}
                          onChange={event => setCaptain(event.target.value)}/>
            {
                members.map((member, index) => (
                    <div key={index + 1}>
                        <Form.Label>{t('description.member')} {index + 1}</Form.Label>
                        <Form.Control type='text' name={index + 1} value={member}
                                      placeholder={t('description.Enter_account')}
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
                    <Button className='float-start' variant='outline-secondary' type='button'
                            onClick={() => {
                                setCount(count + 1)
                                setMembers(members => [...members, ''])
                            }}>{t('description.Add')}</Button>
                </Col>
                <Col>
                    <Button className='float-end' variant='outline-secondary' type='button'
                            onClick={() => {
                                if (count > 0) {
                                    setCount(count - 1)
                                    const tmp = members.slice()
                                    tmp.splice(members.length - 1, 1)
                                    setMembers(tmp)
                                }
                            }}>{t('description.Sub')}</Button>
                </Col>
            </Row>
            <Button variant='primary' type='submit'>{t('description.Submit')}</Button>
        </Form>
    )
}