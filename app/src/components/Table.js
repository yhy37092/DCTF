import React from 'react'
import {Form, Table} from 'react-bootstrap'
import {useTranslation} from "react-i18next";

export default ({data}) => {
    const {t} = useTranslation();

    return (
        <Form>
            <Table responsive bordered hover>
                <thead className='thead-light'>
                <tr>
                    {data.length > 0 && Object.keys(data[0]).map((value, index) => <th
                        key={index}>{t(`description.${value}`)}</th>)}
                </tr>
                </thead>
                <tbody>
                {
                    data.map((value, index) => (
                        <tr key={index}>
                            {Object.keys(value).map((ii, jj) => <td key={jj}>{value[ii]}</td>)}
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </Form>

    )
}