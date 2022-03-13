import React from "react";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import CustomLink from "../CustomLink";
import {useTranslation} from "react-i18next";

const lngs = {
    en: {nativeName: 'English'},
    zh_cn: {nativeName: '简体中文'}
};

export default ({contestId}) => {
    const {t, i18n} = useTranslation();
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
                <Link to={"/"} className="navbar-brand">Decentralized CTF</Link>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Item>
                            <CustomLink
                                to={`/ContestAdmin/Contest-${contestId}`}>{t('description.AWD')}</CustomLink>
                        </Nav.Item>
                        <Nav.Item>
                            <CustomLink
                                to={`/ContestAdmin/Contest-${contestId}/Challenges`}>{t('description.Challenges')}</CustomLink>
                        </Nav.Item>
                        <Nav.Item>
                            <CustomLink
                                to={`/ContestAdmin/Contest-${contestId}/GameBoxes`}>{t('description.GameBoxes')}</CustomLink>
                        </Nav.Item>
                        <Nav.Item>
                            <CustomLink
                                to={`/ContestAdmin/Contest-${contestId}/Teams`}>{t('description.Teams')}</CustomLink>
                        </Nav.Item>
                        <Nav.Item>
                            <CustomLink
                                to={`/ContestAdmin/Contest-${contestId}/Flags`}>{t('description.Flags')}</CustomLink>
                        </Nav.Item>
                        <Nav.Item>
                            <CustomLink
                                to={`/ContestAdmin/Contest-${contestId}/Submissions`}>{t('description.Submissions')}</CustomLink>
                        </Nav.Item>
                        <Nav.Item>
                            <CustomLink
                                to={`/ContestAdmin/Contest-${contestId}/ScoreBoard`}>{t('description.ScoreBoard')}</CustomLink>
                        </Nav.Item>
                    </Nav>

                    <Nav>
                        <NavDropdown as={Nav.Item} title={<i className="fas fa-language">Language</i>}>
                            {Object.keys(lngs).map((lng) => (
                                <Button as={NavDropdown.Item} key={lng} onClick={() => i18n.changeLanguage(lng)}>
                                    {lngs[lng].nativeName}
                                </Button>
                            ))}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}