import React from 'react';
import SwiggyLogo from "../../../../assets/SwiggyLogo";
import classes from "./Navbar.module.css";
import SwiggyHelpIcon from "../../../../assets/SwiggyHelpIcon";
import SwiggySigninIcon from "../../../../assets/SwiggySigninIcon";

function Navbar(props) {
    return (<nav>
        <ul className={classes.nav}>
            <li className={classes.nav_brand}>
                <SwiggyLogo/>
                <p><strong>SECURE CHECKOUT</strong></p>
            </li>
            <li className={classes.nav_items}>
                <span className={classes.nav_item}><SwiggyHelpIcon/> Help</span>
                <span className={classes.nav_item}><SwiggySigninIcon/> Sign In</span>
            </li>
        </ul>
    </nav>);
}

export default Navbar;