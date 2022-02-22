import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import {useTranslation} from "react-i18next";

export default ({onSubmit, data}) => {
    const {t} = useTranslation();
    const [checkList, setCheckList] = useState([])
    useEffect(() => {
        setCheckList(Array(data.length).fill(false))
    }, [data])

    return (
        <Form onSubmit={event => {
            event.preventDefault()
            const _data = []
            checkList.map((value, index) => value && _data.push(data[index]))
            onSubmit({_data: _data})
        }
        }>
            <Row><Col>
                <Button className='float-end' variant='outline-danger' type='submit'>
                    <i className='btn-fa fas fa-trash-alt'/>
                </Button>
            </Col></Row>
            <Table responsive bordered hover>
                <thead className='thead-light'>
                <tr>
                    <th><Form.Check type={'checkbox'} id={'default-checkbox'}
                                    onChange={event => (setCheckList(checkList.slice().fill(event.target.checked)))}/>
                    </th>
                    <th>{t('description.account')}</th>
                </tr>
                </thead>
                <tbody>
                {data.map((value, index) => (
                    <tr key={index}>
                        <td><Form.Check type='checkbox' id={index}
                                        checked={checkList.length > index && checkList[index]}
                                        onChange={event => {
                                            const tmp = checkList.slice()
                                            tmp[index] = event.target.checked
                                            setCheckList(tmp)
                                        }}/></td>
                        <td>{value}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Form>
    )
}