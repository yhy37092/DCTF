import React, {useEffect, useState} from "react";
import {after} from "../../../utils/utils";
import {ContestPreview} from "../../../components/Contest";


export default ({drizzle, drizzleState}) => {

    const {getAll} = drizzle.contracts.Contests.methods;

    const [contestsKey, setContestsKey] = useState(0);
    const {Contests} = drizzleState.contracts;
    const contests = Contests.getAll[contestsKey]
    useEffect(() => {
        const contestsKey = getAll.cacheCall();
        setContestsKey(contestsKey);
    }, [getAll])

    return (
        <>
            {
                contests ? (
                    contests.value.map((contest, index) => ((after(contest.contestInfo.end) ? (
                        <div key={index}>
                            <ContestPreview contest={contest} link={`/Contests/Contest-${contest.id}`}/>
                            <br/>
                        </div>
                    ) : null)))) : null
            }
        </>
    );
};