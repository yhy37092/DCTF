import React, {useCallback, useState} from 'react'
import {drizzleReactHooks} from '@drizzle/react-plugin'
import {Button, Modal} from 'react-bootstrap'
import TransactionStatuses from '../TransactionStatuses'
import GrantForm from '../Forms/GrantForm'
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'


export default ({Role}) => {
    const {t} = useTranslation();

    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('AccessContr0l', 'grantRoles')

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Button variant='outline-secondary' onClick={handleShow}>
                <FontAwesomeIcon icon={solid("circle-plus")}/>
            </Button>
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