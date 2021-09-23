import React, { useState } from 'react';
import { userUpdateName, userUpdateEmail, userUpdatePassword } from '../../Services/Firebase';

export default function ItemUpdateProfile({ user, profile, setOpen }) {
    const [property, setProperty] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notice, setNotice] = useState({ error: false, success: false, msg: "" });

    const handleChange = (e) => {
        setProperty(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorResult = null;
        switch (profile) {
            case "Name":
                errorResult = await userUpdateName(user, property);
                break;
            case "Email":
                errorResult = await userUpdateEmail(user, property);
                break;
            case "Password":
                if (property.length < 6 || property !== confirmPassword)
                    return setNotice({ ...notice, error: true, msg: "Invalid password (Min 6 chars)" });

                errorResult = await userUpdatePassword(user, property);
                break;
            default:
                break;
        }
        if (errorResult)
            return setNotice({ ...notice, error: true, msg: errorResult });

        setNotice({ ...notice, success: true, msg: `${profile} updated!` });
        setTimeout(() => {
            setOpen(false);
        }, 1300);
    }

    return (
        <div>
            <div className={notice.error ? "msg-error" : "msg-success"}>{notice.error || notice.success ? notice.msg : <>&nbsp;</>}</div>
            <form onSubmit={handleSubmit} className="form-grid-new">
                {profile === "Name" ?
                    <>
                        <label htmlFor="name">Enter your new name</label>
                        <input
                            type="text"
                            id="name"
                            value={property}
                            onChange={handleChange}
                            required
                        />
                    </>
                    : profile === "Email" ?
                        <>
                            <label htmlFor="email">Enter your new email</label>
                            <input
                                type="email"
                                id="email"
                                value={property}
                                onChange={handleChange}
                                required
                            />
                        </>
                        :
                        <>
                            <label htmlFor="password">Enter your new password</label>
                            <input
                                type="password"
                                id="password"
                                value={property}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="confirmPassword">Confirm your new password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                        </>

                }
                <button type="submit" className="btn-new-acc">Update</button>
            </form>
        </div>
    )
}
