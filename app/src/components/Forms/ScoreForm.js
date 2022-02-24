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
                    <th>{t('description.Id')}</th>
                    <th>{t('description.Name')}</th>
                    <th>{t('description.Score')}</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((value, index) => (
                        <tr key={index}>
                            <td>{value.team.id}</td>
                            <td>{value.team.info.name}</td>
                            <td>{value.score}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </Form>

    )
}