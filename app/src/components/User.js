import React from "react";
import {toEther} from "../utils/utils";
import {Container} from "react-bootstrap";
import "./User.css"

export default ({drizzle, drizzleState}) => (
    <Container>
        <>
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="card p-4">
                    <div width="100"
                         className=" image d-flex flex-column justify-content-center align-items-center">
                        <img alt="user img" src="https://i.imgur.com/xsoxqor.png" height="100" width="100"/>
                        <p id="address" className="overflow-ellipsis">{drizzleState.accounts[0]}</p>
                        <p id="eth" className="overflow-hidden">{toEther(drizzleState.accountBalances[drizzleState.accounts[0]])}</p>
                        <p align="center">ETH</p>
                    </div>
                </div>
            </div>
        </>
    </Container>
)
