import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Col, Form, Row} from "react-bootstrap";

export default ({onSubmit, challenges, teams}) => {
    const {t} = useTranslation();
    const [challengeId, setChallengeId] = useState(0)
    const [teamId, setTeamId] = useState(0)
    const [IP, setIP] = useState('')
    const [Port, setPort] = useState(0)
    const [Flag_SSH_Port, setFlag_SSH_POrt] = useState(0)
    const [Flag_SSH_User_Name, setFlag_SSH_User_Name] = useState('')
    const [Flag_SSH_Password, setFlag_SSH_Password] = useState('')
    return (
        <Form onSubmit={event => {
            event.preventDefault()
            onSubmit({
                challengeId: challengeId,
                teamId: teamId,
                _data: [IP, Port, Flag_SSH_Port, Flag_SSH_User_Name, Flag_SSH_Password]
            })
        }
        }>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Challenge')}:</Form.Label>
                        <Form.Select onChange={event => setChallengeId(parseInt(event.target.value))}>
                            <option value={0}>{t('description.selectChallenge')}</option>
                            {challenges.map((challenge, index) => (
                                <option key={index} value={challenge.id}>{challenge.info.name}</option>))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Team')}:</Form.Label>
                        <Form.Select onChange={event => setTeamId(parseInt(event.target.value))}>
                            <option value={0}>{t('description.selectTeam')}</option>
                            {teams.map((team, index) => (
                                <option key={index} value={team.id}>{team.info.name}</option>))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.IP')}:</Form.Label>
                        <Form.Control type='text' value={IP}
                                      placeholder={t('description.enterIP')}
                                      onChange={event => setIP(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Port')}:</Form.Label>
                        <Form.Control type='text' value={Port}
                                      placeholder={t('description.enterPort')}
                                      onChange={event => setPort(parseInt(event.target.value))}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Flag_SSH_Port')}:</Form.Label>
                        <Form.Control type='text' value={Flag_SSH_Port}
                                      placeholder={t('description.enterFlag_SSH_Port')}
                                      onChange={event => setFlag_SSH_POrt(parseInt(event.target.value))}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Flag_SSH_User_Name')}:</Form.Label>
                        <Form.Control type='text' value={Flag_SSH_User_Name}
                                      placeholder={t('description.enterFlag_SSH_User_Name')}
                                      onChange={event => setFlag_SSH_User_Name(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as={Row}>{t('description.Flag_SSH_Password')}:</Form.Label>
                        <Form.Control type='text' value={Flag_SSH_Password}
                                      placeholder={t('description.enterFlag_SSH_Password')}
                                      onChange={event => setFlag_SSH_Password(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Button className='float-end' variant='primary' type='submit'>{t('description.Create')}</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form>)

}