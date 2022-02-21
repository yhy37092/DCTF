import React from 'react'
import {drizzleReactHooks} from "@drizzle/react-plugin"
import {Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import TransactionStatuses from '../../components/TransactionStatuses'
import {getUserFlags} from "../../reducers/flags";
import {useTranslation} from "react-i18next";

export default ({contest, team}) => {
    const {t, i18n} = useTranslation();
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const {send, TXObjects} = useCacheSend('Moves', 'revealForMembers')
    const flags = useSelector(getUserFlags)

    function handleReveal() {
        const _challengeIds = []
        const _flags = []
        const _salts = []
        flags.forEach(flag => {
            if (contest.id === flag.contestId) {
                _challengeIds.push(flag.challengeId)
                _flags.push(flag.flag)
                _salts.push(flag.salt)
            }
        })
        _challengeIds.length > 0 && send(contest.id, team.id, _challengeIds, _flags, _salts)
    }

    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <h1 align="center">{t('description.Challenges')}
                <Button variant="outline-secondary" onClick={handleReveal}>
                    <i className="fas fa-arrow-circle-up"/>
                </Button>
            </h1>
        </>
    )
}