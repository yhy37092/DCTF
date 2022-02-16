import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Table} from "react-bootstrap";
import {toMoveState} from "../../../../utils/utils";

export default ({drizzle, drizzleState}) => {

    const {contestId} = useParams();

    const {gets} = drizzle.contracts.Moves.methods;
    const {getSome} = drizzle.contracts.Teams.methods;

    const [movesKey, setMovesKey] = useState(0);
    const [teamsKey, setTeamsKey] = useState(0);
    const {Moves} = drizzleState.contracts;
    const {Teams} = drizzleState.contracts;
    const moves = Moves.gets[movesKey];
    const teams = Teams.getSome[teamsKey];
    useEffect(() => {
        const movesKey = gets.cacheCall(contestId);
        setMovesKey(movesKey);
    }, [gets, contestId]);
    useEffect(() => {
        const ids = [];
        moves && moves.value.forEach(move => ids.push(move.teamId));
        const teamsKey = getSome.cacheCall(ids);
        setTeamsKey(teamsKey);
    },[getSome,moves]);

    return (
        <Table responsive bordered hover>
            <thead className="thead-light">
            <tr>
                <th>id</th>
                <th>team</th>
                <th>hash</th>
                <th>flag</th>
                <th>state</th>
            </tr>
            </thead>
            <tbody>
            {moves ? (
                moves.value.map((move, index) => (
                    <tr key={index}>
                        <td>{move.id}</td>
                        <td>{teams && teams.value[index] && teams.value[index].teamInfo.name}</td>
                        <td>{move.moveInfo.hash}</td>
                        <td>{move.moveInfo.flag}</td>
                        <td>{toMoveState(move.state)}</td>
                    </tr>
                ))
            ) : null}
            </tbody>
        </Table>
    )
}