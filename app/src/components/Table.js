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
                {data.length > 0 && Object.keys(data[0]).map((value, index) => <th
                    key={index}>{t(`description.${value}`)}</th>)}
            </tr>
            </thead>
            <tbody>
            {
                data.map((value, index) => (
                    _filter(value) ? <tr key={index}>
                        {Object.keys(value).map((ii, jj) => <td key={jj}>{value[ii]}</td>)}
                    </tr> : null
                ))
            }
            </tbody>
        </Table>

    )
}