import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import {useTranslation} from "react-i18next";

export default ({onSubmit, data, filter}) => {
    const {t} = useTranslation();
    const [checkList, setCheckList] = useState([])
    useEffect(() => {
        setCheckList(Array(data.length).fill(false))
    }, [data.length])
    const _filter = (value) => {
        if (filter === undefined) return true
        return filter({_data: value})
    }
    return (
        <Form onSubmit={event => {
            event.preventDefault()
            const selectedData = []
            checkList.map((value, index) => value && selectedData.push(data[index]))
            onSubmit({selectedData: selectedData})
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
                    {data.length > 0 && Object.keys(data[0]).map((value, index) => <th
                        key={index}>{t(`description.${value}`)}</th>)}
                </tr>
                </thead>
                <tbody>
                {
                    data.map((value, index) => (
                        _filter(value) ? <tr key={index}>
                            <td><Form.Check type='checkbox' id={index}
                                            checked={checkList.length > index && checkList[index]}
                                            onChange={event => {
                                                const tmp = checkList.slice()
                                                tmp[index] = event.target.checked
                                                setCheckList(tmp)
                                            }}/></td>
                            {Object.keys(value).map((ii, jj) => <td key={jj}>{value[ii]}</td>)}
                        </tr> : null
                    ))
                }
                </tbody>
            </Table>
        </Form>
    )
}