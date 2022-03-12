import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AWDAdd, AWDRemove, getAWDSubmits} from "../../../../reducers/Submit";
import CommitForm from "../../../Forms/CommitForm";
import Web3Utils from "web3-utils";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import TransactionStatuses from "../../../TransactionStatuses";
import {Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default ({contestId, challengeId, teamId, teams}) => {
    const {t} = useTranslation();
    const {useCacheSend} = drizzleReactHooks.useDrizzle()
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({account: drizzleState.accounts[0]}))
    const {send, TXObjects} = useCacheSend('AWD', 'commitSubmit')
    const submits = useSelector(getAWDSubmits);
    const dispatch = useDispatch();
    const [targetTeamId, setTargetTeamId] = useState(0)
    return (
        <>
            <TransactionStatuses TXObjects={TXObjects}/>
            <Form.Select onChange={event => setTargetTeamId(parseInt(event.target.value))}>
                <option value={0}>{t('description.selectTeam')}</option>
                {teams.map((team, index) => (
                    parseInt(team.Id) !== teamId && <option key={index} value={team.Id}>{team.Name}</option>))}
            </Form.Select>
            <CommitForm data={''} onSubmit={useCallback(({_data}) => {
                submits.forEach((flag, index) => {
                    if (flag.challengeId === challengeId &&
                        flag.sender === drizzleState.account)
                        dispatch(AWDRemove(index));
                })
                const salt = Web3Utils.randomHex(32);
                dispatch(AWDAdd({
                    contestId: contestId,
                    challengeId: challengeId,
                    teamId: teamId,
                    targetTeamId: targetTeamId,
                    flag: _data,
                    salt: salt,
                    sender: drizzleState.account
                }));
                send(contestId, challengeId, teamId, targetTeamId, Web3Utils.soliditySha3(_data, salt))
            }, [contestId, challengeId, teamId, targetTeamId, submits, send, dispatch, drizzleState.account])}/>
        </>
    )
}