import React from "react";

const Profile = () => {
    if (!localStorage['user']) {
        return (
            <div>
                <h1>您好，请登录！</h1>
            </div>
        )
    }
    else {
        const user = JSON.parse(localStorage['user']);
        console.log(user);
        return (
            <div>
                <h1>您好，{user[0]['nickname']}</h1>
            </div>
        )
    }
}

export default Profile;