import React, { useEffect, useState, createContext } from "react";
import { auth } from "../Services/Firebase";

export const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (!user)
                return setUser(null);

            while (!user.displayName) {
                await user.reload();
            }
            const { email, displayName, photoURL, uid } = user;
            setUser({ email, displayName, photoURL, uid });
        });
    }, []);

    return (
        <UserContext.Provider value={user}>
            <div>{props.children}</div>
        </UserContext.Provider>
    );
};
