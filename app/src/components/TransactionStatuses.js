import React, {useEffect, useState} from 'react'
import {ListGroup, Toast, ToastContainer} from "react-bootstrap";

export default ({TXObjects}) => {
    const [show, setShow] = useState(false)
    const toggleShow = () => setShow(!show);
    useEffect(() => {
        if (TXObjects.length > 0) setShow(true)
        else setShow(false)
    }, [TXObjects])
    return (
        <ToastContainer position="top-middle">
            <Toast show={show} onClose={toggleShow}>
                <Toast.Header>
                    <strong className="me-auto">Transaction status</strong>
                </Toast.Header>
                <Toast.Body>
                    <ListGroup>
                        {TXObjects.map((TXObject, index) => (
                            <ListGroup.Item key={index}>
                                {TXObject === undefined && 'waiting for conform'}
                                {TXObject && TXObject.status === 'pending' && 'pending'}
                                {TXObject && TXObject.status === 'success' && 'success'}
                                {TXObject && TXObject.status === 'error' && `error: ${TXObject.error.message}`}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}