import React, {useEffect, useState} from "react";
import {ContestPreview} from "../../../components/Contest";


export default ({drizzle, drizzleState}) => {

    const {getApply} = drizzle.contracts.Teams.methods;
    const {getSome} = drizzle.contracts.Contests.methods;

    const [idsKey, setIdsKey] = useState(0);
    const {Teams} = drizzleState.contracts;
    const ids = Teams.getApply[idsKey]
    useEffect(() => {
        const idsKey = getApply.cacheCall();
        setIdsKey(idsKey);
    }, [getApply])

    const [contestsKey, setContestsKey] = useState(0);
    const {Contests} = drizzleState.contracts;
    const contests = Contests.getSome[contestsKey]
    useEffect(() => {
        const contestsKey = ids ? getSome.cacheCall(ids.value) : 0;
        setContestsKey(contestsKey);
    }, [getSome, ids])

    return (
        <>
            {
                contests &&
                contests.value.map((contest, index) => (<div key={index}>
                    <ContestPreview contest={contest} link={`/Contests/Contest-${contest.id}`}/>
                    <br/>
                </div>))
            }
        </>
    );
};