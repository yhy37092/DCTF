import React from 'react'
import {Form, Table} from 'react-bootstrap'
import {toTeamState} from '../../utils/utils'
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
                    <th>{t('description.Captain')}</th>
                    <th>{t('description.State')}</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((value, index) => (
                        <tr key={index}>
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