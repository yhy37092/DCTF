import React from "react";
import {Row, Stack} from "react-bootstrap";
import ChallengePreview from "./ChallengePreview";

export default ({challenges,contestId,teamId}) => {
    return (
        <Stack gap={2}>
            {challenges.map((challenge, index) => <Row><ChallengePreview key={index} contestId={contestId} teamId={teamId} challenge={challenge}/></Row>)}
        </Stack>
    )
}