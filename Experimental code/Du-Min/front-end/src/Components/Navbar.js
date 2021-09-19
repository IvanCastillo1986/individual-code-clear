import React, { useContext, useState, useRef, useEffect } from 'react';
import { CSSTransition } from "react-transition-group";

import { UserContext } from '../Providers/UserProvider';
import { userSignUp, userAccountSignIn, userProviderSignIn, userSignOut } from '../Services/Firebase';

import "./Navbar.css";
import { ReactComponent as IcArrowBack } from "../Assets/icons/arrow_back.svg";
import { ReactComponent as IcArrowForward } from "../Assets/icons/arrow_forward.svg";
import { ReactComponent as IcLogin } from "../Assets/icons/login.svg";
import { ReactComponent as IcLogout } from "../Assets/icons/logout.svg";
import { ReactComponent as IcSettings } from "../Assets/icons/settings.svg";
import { ReactComponent as IcAccounts } from "../Assets/icons/accounts.svg";
import { ReactComponent as IcUser } from "../Assets/icons/user.svg";
import { ReactComponent as IcAddAcc } from "../Assets/icons/add_account.svg";
import { ReactComponent as IcGithub } from "../Assets/icons/logo_github.svg";
import { ReactComponent as IcGoogle } from "../Assets/icons/logo_google.svg";
import { ReactComponent as IcIdentity } from "../Assets/icons/identity.svg";
// import { ReactComponent as IcLauch } from "../Assets/icons/lauch.svg";

export default function Navbar() {
    const user = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({ email: "", password: "", name: "", url: "" });

    const handleInfoChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
    }

    return (
        <nav className='navbar'>
            <ul className="navbar-nav">
                <li className="nav-item-msg">
                    {user ? `Hi ${user.displayName}!` : "Hello Guest."}
                </li>
                <li className="nav-item">
                    <div className="icon-button" onClick={() => setOpen(!open)}>
                        {user ? <IcAccounts /> : <IcUser />}
                    </div>
                    {open && <DropdownMenu setOpen={setOpen} handleInfoChange={handleInfoChange} user={user} />}
                </li>
            </ul>
        </nav>
    )
}

function DropdownItemLogIn(props) {
    const handleInfoSubmit = async (e) => {
        e.preventDefault();
    }

    const handleInfoChange = (e) => {
        props.setUserInfo({ ...props.userInfo, [e.target.id]: e.target.value });
    }

    return (
        <div>
            <form onSubmit={handleInfoSubmit} className="form-grid">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={props.userInfo.email}
                    onChange={handleInfoChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={props.userInfo.password}
                    onChange={handleInfoChange}
                    required
                />
            </form>
        </div>
    )
}

function DropdownMenu(props) {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    }, [])

    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    const signInWithEmail = async () => {
        try {
            const { email, password } = userInfo;
            await userAccountSignIn(email, password);
            // if (!result)
            //     return;
            // need to check
            props.setOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithProvider = async (provider) => {
        try {
            await userProviderSignIn(provider);
            props.setOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    const signOut = async () => {
        try {
            await userSignOut();
            props.setOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    function DropdownItem(props) {
        return (
            <div className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                <span className="menu-item-name" onClick={props.clickAction}>{props.children}</span>
                <span className="icon-right">{props.rightIcon}</span>
            </div>
        )
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
            <CSSTransition
                in={activeMenu === "main"}
                unmountOnExit
                timeout={100}
                classNames="menu-primary"
                onEnter={calcHeight}
            >
                <div className="menu">
                    {props.user ? <>
                        <DropdownItem goToMenu="settings" leftIcon={<IcSettings />} rightIcon={<IcArrowForward />}>Settings</DropdownItem>
                        <DropdownItem leftIcon={<IcIdentity />}>empty</DropdownItem>
                        <DropdownItem leftIcon={<IcLogout />} clickAction={signOut}>Log Out</DropdownItem>
                    </> : <>
                        <DropdownItemLogIn userInfo={userInfo} setUserInfo={setUserInfo} />
                        <DropdownItem leftIcon={<IcLogin />} clickAction={signInWithEmail}>Log In</DropdownItem>
                        <DropdownItem leftIcon={<IcGoogle />} clickAction={() => signInWithProvider("google")}>Log In with Google</DropdownItem>
                        <DropdownItem leftIcon={<IcGithub />} clickAction={() => signInWithProvider("github")}>Log In with GitHub</DropdownItem>
                        <DropdownItem goToMenu="sign-up" leftIcon={<IcAddAcc />} rightIcon={<IcArrowForward />}>Sign Up New Account</DropdownItem>
                    </>}
                </div>
            </CSSTransition >

            <CSSTransition
                in={activeMenu === "sign-up"}
                timeout={250}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItemSignUp {...props} />
                    <DropdownItem goToMenu="main" leftIcon={<IcArrowBack />}>
                        <h4>Go Back</h4>
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "settings"}
                timeout={250}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<IcArrowBack />}>
                        <h4>Go Back</h4>
                    </DropdownItem>
                    <DropdownItem leftIcon={"🛠"}>empty</DropdownItem>
                    <DropdownItem leftIcon={"🔧"}>empty</DropdownItem>
                    <DropdownItem leftIcon={"🔨"}>empty</DropdownItem>
                </div>
            </CSSTransition>
        </div >
    )
}

function DropdownItemSignUp(props) {
    const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "", confirmPassword: "", url: "" });

    const handleInfoSubmit = async (e) => {
        e.preventDefault();
        try {
            const { name, email, password, confirmPassword, url } = userInfo;
            if (password !== confirmPassword)
                return;

            await userSignUp(name, email, password, url);
            props.setOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleInfoChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
    }

    return (
        <div>
            <form onSubmit={handleInfoSubmit} className="form-grid-new">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={userInfo.email}
                    onChange={handleInfoChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={userInfo.password}
                    onChange={handleInfoChange}
                    required
                />
                <label htmlFor="confirmPassword">
                    Confirm Password {userInfo.confirmPassword && (userInfo.password !== userInfo.confirmPassword) && "doesn't match"}
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={userInfo.confirmPassword}
                    onChange={handleInfoChange}
                    required
                />
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={userInfo.name}
                    onChange={handleInfoChange}
                    required
                />
                <label htmlFor="url">Photo URL</label>
                <input
                    type="url"
                    id="url"
                    value={userInfo.url}
                    onChange={handleInfoChange}
                    placeholder="optional"
                />
                <button type="submit" className="btn-new-acc">Create Account</button>
            </form>
        </div>
    )
}
