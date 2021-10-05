import React, { useState } from 'react';
import { userDeleteAccount } from '../../Services/Firebase';
import axios from "axios";
import { apiURL } from "../../util/apiURL";

const API = apiURL();

export default function ItemDeleteUser({ user, setOpen }) {
    const [notice, setNotice] = useState({ error: false, msg: "" });

    const handleDelete = async () => {
        const errorResult = await userDeleteAccount(user);
        if (errorResult)
            return setNotice({ error: true, msg: errorResult });

        await axios.delete(`${API}/stats/${user.uid}`);
        setNotice({ error: false, msg: "Done, goodbye!" });
        setTimeout(() => {
            setOpen(false);
        }, 1400)
    }

    return (
        <div className="page-delete">
            <h3>Are you sure?</h3>
            <h4>All your data will be permanently removed.</h4>
            <div className={notice.error ? "msg-error" : "msg-success"}>{notice.msg ? notice.msg : <>&nbsp;</>}</div>
            <button className="btn-delete-acc" onClick={handleDelete}>CONFIRM</button>
        </div>
    )
}
