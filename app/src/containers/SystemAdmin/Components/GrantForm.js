import React, {useState} from 'react'
import {Button, Form, FormControl, FormGroup, FormLabel, ModalFooter} from "react-bootstrap";

export default ({onSubmit}) => {

    const [accounts, setAccounts] = useState([]);
    const [count, setCount] = useState(1);

    return (

        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit(
                {
                    accounts: accounts
                }
            )
        }}>
            <FormGroup>
                <FormLabel>account address</FormLabel>
                {
                    accounts.map((account, index) => (
                        <div key={index}>
                            <FormLabel>account {index + 1}</FormLabel>
                            <FormControl type="text" name="account" value={account} placeholder="Enter account"
                                         onChange={event => {
                                             setAccounts(accounts.slice().fill(event.target.value, index, index + 1))
                                         }}/>
                        </div>
                    ))
                }
            </FormGroup>
            <ModalFooter>
                <Button className="float-start" variant="outline-secondary" type="button"
                        onClick={() => {
                            setCount(count + 1)
                            setAccounts(accounts => [...accounts, ''])
                        }}>Add account</Button>
                <Button variant="primary" type="submit">Submit</Button>
            </ModalFooter>
        </Form>
    )
}