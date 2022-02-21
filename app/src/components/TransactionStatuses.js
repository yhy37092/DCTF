import React, {useEffect, useState} from 'react'
import {ListGroup, Toast, ToastContainer} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default ({TXObjects}) => {
    const {t, i18n} = useTranslation();
    const [show, setShow] = useState(false)
    const toggleShow = () => setShow(!show);
    useEffect(() => {
        if (TXObjects.length > 0) setShow(true)
        else setShow(false)
    }, [TXObjects])
    return (
        <ToastContainer position="top-middle" className="position-fixed bottom-0 end-0">
            <Toast show={show} onClose={toggleShow}>
                <Toast.Header>
                    <strong className="me-auto">{t('description.Transaction_status')}</strong>
                </Toast.Header>
                <Toast.Body>
                    <ListGroup>
                        {TXObjects.map((TXObject, index) => (
                            <ListGroup.Item key={index}>
                                {TXObject === undefined && t('description.waiting')}
                                {TXObject && TXObject.status === 'pending' && t('description.pending')}
                                {TXObject && TXObject.status === 'success' && t('description.success')}
                                {TXObject && TXObject.status === 'error' && t('description.error')}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}