import React from 'react'
import {Form, Table} from 'react-bootstrap'
import {toMoveState} from "../../utils/utils";
import {useTranslation} from "react-i18next";

export default ({data}) => {
    const {t} = useTranslation();
    return (
        <Form>
            <Table responsive bordered hover>
                <thead className='thead-light'>
                <tr>
                    <th>{t('description.Id')}</th>
                    <th>{t('description.Challenge')} {t('description.Name')}</th>
                    <th>{t('description.Team')} {t('description.Name')}</th>
                    <th>{t('description.Hash')}</th>
                    <th>{t('description.Flag')}</th>
                    <th>{t('description.State')}</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((value, index) => (
                        <tr key={index}>
                            <td>{value.move.id}</td>
                            <td>{value.challenge.info.name}</td>
                            <td>{value.team.info.name}</td>
                            <td>{value.move.info.hash}</td>
                            <td>{value.move.info.flag}</td>
                            <td>{toMoveState(value.move.state)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </Form>
    )
}