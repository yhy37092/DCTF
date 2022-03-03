import React, {useState} from "react";
import {Button, Card, Modal, Tab, Tabs} from "react-bootstrap";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useTranslation} from "react-i18next";
import {ChallengeDetail} from "../index";
import GameBoxDetail from "../../GameBox/GameBoxDetail";
import ListGameBox from "../../GameBox/ListGameBox";

export default ({contestId, teamId, challenge, gameBox}) => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    const {t} = useTranslation();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Tabs className="mb-3">
                        <Tab eventKey="Challenge" title={t('description.Challenge')}>
                            <ChallengeDetail challenge={challenge}/>
                        </Tab>
                        <Tab eventKey="GameBox" title={t('description.myGameBox')}>
                            <GameBoxDetail gameBox={useCacheCall(['GameBoxes'], call => {
                                const gameBoxId = call('GameBoxes', 'getChallengeTeamGameBoxId', challenge.id, teamId) || 0
                                return call('GameBoxes', 'getGameBox', gameBoxId) || gameBox
                            })
                            }/>
                        </Tab>
                        <Tab eventKey="gameBoxList" title={t('description.gameBoxList')}>
                            <ListGameBox contestId={contestId}
                                         filter={({_data}) => (_data.ChallengeId === challenge.id)}/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
            <Card className="text-center">
                <Card.Header>{challenge.info.category}</Card.Header>
                <Card.Body>
                    <Card.Title>{challenge.info.name}</Card.Title>
                    <Card.Text>{challenge.info.value} {t('description.point')}</Card.Text>
                    <Card.Link><Button variant={"outline-info"}
                                       onClick={handleShow}>{t('description.Detail')}</Button></Card.Link>
                </Card.Body>
            </Card>
        </>
    )
}