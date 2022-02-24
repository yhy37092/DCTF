import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {toContestState, toDate, toEther} from '../../utils/utils'
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
            checkList.map((value, index) => value && _data.push(data[index].id))
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
                    <th>{t('description.Id')}</th>
                    <th>{t('description.Name')}</th>
                    <th>{t('description.Type')}</th>
                    <th>{t('description.Fee')}</th>
                    <th>{t('description.Start')}</th>
                    <th>{t('description.End')}</th>
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
                            <td><Link
                                to={`/ContestAdmin/Contest-${value.id}`}>{value.info.name}</Link>
                            </td>
                            <td>{t(`description.${value.info.contestType}`)}</td>
                            <td>{toEther(value.info.fee)} ether</td>
                            <td>{toDate(value.info.start)}</td>
                            <td>{toDate(value.info.end)}</td>
                            <td>{toContestState(value.state)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </Form>
    )
}