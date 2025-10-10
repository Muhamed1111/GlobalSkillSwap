import React from 'react'
import loginBg from "../../asserts/images/login.png";
import Button from '../../components/Button';
import { Link } from "react-router-dom";
/*import googleIcon from "../../asserts/icons/google.png";
import linkedinIcon from "../../asserts/icons/linkedin.png";
*/

const login = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${loginBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
                margin: "0px",
                paddingTop: "120px"

            }}
            className="login">
            <div
                className="login-card"
                style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    padding: "40px",
                    borderRadius: "10px",
                    color: "white",
                    textAlign: "center",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                    width: "320px"
                }}
            >
                <h3 style={{ fontSize: "26px", marginBottom: "25px", fontWeight: "600" }}>
                    Login Page
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <label style={{ fontSize: "15px", textAlign: "left" }}>
                        Email
                        <input
                            placeholder="example@gmail.com"
                            type="email"
                            required
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "5px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                fontSize: "14px",
                            }}
                        />
                    </label>

                    <label style={{ fontSize: "15px", textAlign: "left" }}>
                        Password
                        <input
                            placeholder="•••••••"
                            type="password"
                            required
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "5px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                fontSize: "14px",
                            }}
                        />
                    </label>

                    <Button

                        padding='10px'
                        borderRadius='10px'
                        color="#e8c428ff"
                        text=' Sign in with Google'
                        hoverColor="#726217ff"
                    />
                    <Button

                        padding='10px'
                        borderRadius='10px'
                        color='#e8c428ff'
                        text='Sign in with LinkdIn'
                        hoverColor="#726217ff"
                    />

                    <Button
                        color="#e0d6a6ff"
                        text="Log In"
                        padding="10px"
                        fontSize="1.5rem"
                        borderRadius="10px"
                        textColor="white"
                        hoverColor="#d8b205ff"
                        transition="0.35s ease"
                    />

                    <p style={{ marginTop: "15px", fontSize: "14px" }}>
                        Don't have an account?{" "}
                        <Link
                            to="/sign-in"
                            style={{
                                color: "#e8c428ff",
                                textDecoration: "none",
                                fontWeight: "600",
                            }}
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default login