import React from 'react'
import {Table} from 'react-bootstrap'
import {useTranslation} from "react-i18next";

export default ({data, filter}) => {
    const {t} = useTranslation();
    const _filter = (value) => {
        if (filter === undefined) return true
        return filter({_data: value})
    }
    return (
        <Table responsive bordered hover>
            <thead className='thead-light'>
            <tr>
                <td>{t(`description.Id`)}</td>
                <td>{t(`description.TeamName`)}</td>
                <td>{t(`description.Address`)}</td>
            </tr>
            </thead>
            <tbody>
            {
                data.map((value, index) => (
                    _filter(value) ? <tr key={index}>
                        <td>{value.Id}</td>
                        <td>{value.TeamName}</td>
                        <td>{value.Address}</td>
                    </tr> : null
                ))
            }
            </tbody>
        </Table>

    )
}