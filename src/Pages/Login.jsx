import users from "../Data/Users.json";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const Login = () => {
    const { userState, userDispatch } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null);

    const checkCredentials = () => {
        if (!username.trim() || !password.trim()) {
            setLoginError("Unesite korisničko ime i lozinku.");
            return;
        }

        let foundUser = false;
        users.forEach((user) => {
            if (user.username === username && user.password === password) {
                foundUser = true;
                userDispatch({ type: "SET_USERNAME", payload: username });
                userDispatch({ type: "SET_IS_LOGGED_IN", payload: true });
                userDispatch({ type: "SET_LOGIN_TIME", payload: Date.now() });
                setUsername("");
                setPassword("");
                setLoginError(null);
            }
        });

        if (!foundUser) {
            setLoginError("Pogrešni kredencijali.");
        }
    };

    useEffect(() => {
        if (userState.isLoggedIn) {
            localStorage.setItem("userData", JSON.stringify(userState));
        }
    }, [userState]);

    return (
        <>
            {!userState.isLoggedIn ? (
                <form>
                    {loginError ? <p>{loginError}</p> : null}
                    <input
                        type="text" placeholder="Unesite korisničko ime" value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password" placeholder="Unesite lozinku" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" onClick={checkCredentials}>Login</button>
                </form>
            ) : (
                <p>Dobrodošli, {userState.username}!</p>
            )}
        </>
    );
};

export default Login;
