import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {getAdminFlags} from '../../../../reducers/flags'
import TransactionStatuses from '../../../../components/TransactionStatuses'
import {useTranslation} from "react-i18next";

export default ({contestId}) => {
    const {t} = useTranslation();
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Moves', 'revealForAdmins')
    const flags = useSelector(getAdminFlags)

    function handleReveal() {
        const _challengeIds = []
        const _flags = []
        const _salts = []
        flags.forEach(flag => {
            if (contestId === flag.contestId) {
                _challengeIds.push(flag.challengeId)
                _flags.push(flag.flag)
                _salts.push(flag.salt)
            }
        })
        _challengeIds.length > 0 && send(contestId, _challengeIds, _flags, _salts)
    }

    return (
        <>
            <Button variant='outline-secondary' onClick={handleReveal}>
                <i className='fas fa-arrow-circle-up'/>
            </Button>
            <TransactionStatuses TXObjects={TXObjects}/>
        </>
    )
}