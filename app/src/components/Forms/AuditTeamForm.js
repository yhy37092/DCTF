import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import {toTeamState} from '../../utils/utils'
import {useTranslation} from "react-i18next";

export default ({onSubmit, data}) => {
    const {t, i18n} = useTranslation();
    const [checkList, setCheckList] = useState([])
    useEffect(() => {
        setCheckList(Array(data.length).fill(false))
    }, [data])

    function handleReject() {
        const _data = []
        checkList.map((value, index) => value && _data.push(data[index].id))
        onSubmit({_data: _data, result: false})
    }

    function handleApprove() {
        const _data = []
        checkList.map((value, index) => value && _data.push(data[index].id))
        onSubmit({_data: _data, result: true})
    }

    return (
        <Form>
            <Row><Col>
                <Button className='float-end' variant='outline-danger' onClick={handleReject}>
                    <i className='fas fa-times-circle'/>
                </Button>
                <Button className='float-end' variant='outline-success' onClick={handleApprove}>
                    <i className='fas fa-check-circle'/>
                </Button>
            </Col></Row>
            <Table responsive bordered hover>
                <thead className='thead-light'>
                <tr>
                    <th><Form.Check type={'checkbox'} id={'default-checkbox'}
                                    onChange={event => (setCheckList(checkList.slice().fill(event.target.checked)))}/>
                    </th>
                    <th>{t('description.Id')}</th>
                    <th>{t('description.Name')}</th>
                    <th>{t('description.Captain')}</th>
                    <th>{t('description.State')}</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((value, index) => (
                        <tr key={index}>
                            <td><Form.Check type='checkbox' id={index}
                                            checked={checkList.length > index && checkList[index]}
                                            onChange={event => {
                                                const tmp = checkList.slice()
                                                tmp[index] = event.target.checked
                                                setCheckList(tmp)
                                            }}/></td>
                            <td>{value.id}</td>
                            <td>{value.info.name}</td>
                            <td>{value.info.captain}</td>
                            <td>{toTeamState(value.state)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </Form>

    )
}