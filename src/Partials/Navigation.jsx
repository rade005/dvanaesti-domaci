import { useContext } from "react";
import { UserContext } from "../App";

export const Navigation = () => {
    const { userState, userDispatch } = useContext(UserContext);

    const logoutUser = (e) => {
        e.preventDefault();
        userDispatch({ type: "SET_USERNAME", payload: null });
        userDispatch({ type: "SET_IS_LOGGED_IN", payload: false });
        userDispatch({ type: "SET_LOGIN_TIME", payload: null });
        localStorage.removeItem("userData");
    };

    return (
        <>
            {userState.isLoggedIn ? (
                <a href="/logout" onClick={logoutUser}>
                    Logout
                </a>
            ) : (
                <a href="/login">Login</a>
            )}
        </>
    );
};
