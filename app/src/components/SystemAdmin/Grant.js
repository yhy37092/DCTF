import React, {useCallback, useState} from 'react'
import {drizzleReactHooks} from '@drizzle/react-plugin'
import Web3Utils from 'web3-utils'
import {Button, Modal} from 'react-bootstrap'
import TransactionStatuses from '../TransactionStatuses'
import GrantForm from '../Forms/GrantForm'

export default () => {
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('AccessContr0l', 'grantRoles')
    const CONTEST_ADMIN = Web3Utils.keccak256('CONTEST_ADMIN')

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <h1 align='center'>Contest admins
                <Button variant='outline-secondary' onClick={handleShow}>
                    <i className='btn-fa fas fa-plus-circle'/>
                </Button>
            </h1>

            <Modal show={show} onHide={handleShow}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>grant a contest admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TransactionStatuses TXObjects={TXObjects}/>
                    <GrantForm onSubmit={useCallback(({accounts}) => {
                        send(CONTEST_ADMIN, accounts)
                    }, [CONTEST_ADMIN, send])}/>
                </Modal.Body>
            </Modal>
        </>
    )
}