import React from 'react'
import {Form, Table} from 'react-bootstrap'
import {toMoveState} from "../../utils/utils";

export default ({data}) => {

    return (
        <Form>
            <Table responsive bordered hover>
                <thead className='thead-light'>
                <tr>
                    <th>id</th>
                    <th>team</th>
                    <th>hash</th>
                    <th>flag</th>
                    <th>state</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((value, index) => (
                        <tr key={index}>
                            <td>{value.id}</td>
                            <td>{value.info.name}</td>
                            <td>{value.info.hash}</td>
                            <td>{value.info.flag}</td>
                            <td>{toMoveState(value.state)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </Form>
    )
}