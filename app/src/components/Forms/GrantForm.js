import React, {useState} from 'react'
import {Button, Form, ModalFooter} from 'react-bootstrap'
import {useTranslation} from "react-i18next";

export default ({onSubmit}) => {
    const {t} = useTranslation();
    const [accounts, setAccounts] = useState([''])
    const [count, setCount] = useState(1)

    return (

        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit(
                {
                    accounts: accounts
                }
            )
        }}>
            <Form.Group>
                <Form.Label>{t('description.account_address')}</Form.Label>
                {
                    accounts.map((account, index) => (
                        <div key={index}>
                            <Form.Text muted>{t('description.account')} {index + 1}</Form.Text>
                            <Form.Control type='text' name='account' value={account} placeholder={t('description.Enter_account')}
                                          onChange={event => {
                                              setAccounts(accounts.slice().fill(event.target.value, index, index + 1))
                                          }}/>
                        </div>
                    ))
                }
            </Form.Group>
            <ModalFooter>
                <Button className='float-start' variant='outline-secondary' type='button'
                        onClick={() => {
                            setCount(count + 1)
                            setAccounts(accounts => [...accounts, ''])
                        }}>{t('description.Add')}</Button>
                <Button className='float-end' variant='outline-secondary' type='button'
                        onClick={() => {
                            if (count > 1) {
                                setCount(count - 1)
                                const tmp = accounts.slice()
                                tmp.splice(accounts.length - 1, 1)
                                setAccounts(tmp)
                            }
                        }}>{t('description.Sub')}</Button>
                <Button variant='primary' type='submit'>{t('description.Submit')}</Button>
            </ModalFooter>
        </Form>
    )
}