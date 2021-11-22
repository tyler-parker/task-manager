import React, { useState, useContext } from "react"
import AuthForm from "./AuthForm.js"
import { UserContext } from '../context/UserProvider.js'

const initInputs = { username: "", password: "" }

export default function Auth() {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const { signup, login, errMsg} = useContext(UserContext)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e) {
        e.preventDefault()
        signup(inputs)
    }
    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }

    const handleToggle = () => { setToggle(prev => !prev) }

    return (
        <div className="auth-container">
            <h1>Voting App</h1>
            {!toggle ?
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        btnText="Sign Up"
                        errMsg={errMsg}
                        title="Sign up for an account"
                        handleToggle={handleToggle}
                        accountStatus='Already Have An Account?'
                    />
                    <p onClick={() => setToggle(prev => !prev)}>Already a member?</p>
                </>
                :
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText="Login"
                        errMsg={errMsg}
                        title="Sign in to your account"
                        handleToggle={handleToggle}
                        accountStatus="Don't Have An Account?"
                    />
                    <p onClick={() => setToggle(prev => !prev)}>Not a member?</p>
                </>
            }

        </div>

    )
}

