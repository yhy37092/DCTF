import React, {useCallback, useState} from 'react'
import {drizzleReactHooks} from '@drizzle/react-plugin'
import {Button, Modal} from 'react-bootstrap'
import TransactionStatuses from '../../components/TransactionStatuses'
import GrantForm from '../../components/Forms/GrantForm'
import {useTranslation} from "react-i18next";

export default ({Role}) => {
    const {t} = useTranslation();

    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('AccessContr0l', 'grantRoles')

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <h1 align='center'>{t('description.Contest_admins')}
                <Button variant='outline-secondary' onClick={handleShow}>
                    <i className='btn-fa fas fa-plus-circle'/>
                </Button>
            </h1>

            <Modal show={show} onHide={handleShow}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>{t('description.grant')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TransactionStatuses TXObjects={TXObjects}/>
                    <GrantForm onSubmit={useCallback(({accounts}) => send(Role, accounts), [Role, send])}/>
                </Modal.Body>
            </Modal>
        </>
    )
}