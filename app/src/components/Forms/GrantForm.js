import React, {useState} from 'react'
import {Button, Form, ModalFooter} from 'react-bootstrap'

export default ({onSubmit}) => {

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
                <Form.Label>account address</Form.Label>
                {
                    accounts.map((account, index) => (
                        <div key={index}>
                            <Form.Text muted>account {index + 1}</Form.Text>
                            <Form.Control type='text' name='account' value={account} placeholder='Enter account'
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
                        }}>Add</Button>
                <Button className='float-end' variant='outline-secondary' type='button'
                        onClick={() => {
                            if (count > 1) {
                                setCount(count - 1)
                                const tmp = accounts.slice()
                                tmp.splice(accounts.length - 1, 1)
                                setAccounts(tmp)
                            }
                        }}>sub</Button>
                <Button variant='primary' type='submit'>Submit</Button>
            </ModalFooter>
        </Form>
    )
}