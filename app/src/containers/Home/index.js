import React from "react";
import HeadBar from "../../components/Navbar/HeaderBar";

export default () => {

    return (
        <HeadBar>
            <p/><p/>
            <div align="center">
                <h5>This is a decentralized ctf platform base on Ethereum.</h5>
                <p><a href="https://en.wikipedia.org/wiki/Decentralized_application">see what is
                    decentralized application here</a></p>
                <p>DCTF suport jeopardy and AWD mode.</p>
                <p>System administrator can grant or revoke contest administrator account in <a
                    href="/systemAdmin">SystemAdmin</a>
                </p>
                <p>Contest admin can publish contest and manage contest in <a
                    href="/contestAdmin">ContestAdmin</a></p>
                <p>As a user, you can attend contest in <a href="/contests">Contests</a> and review ended
                    one in <a href="/revire">Review</a></p>
            </div>
        </HeadBar>
    );

}
