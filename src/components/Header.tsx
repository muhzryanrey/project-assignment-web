import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();

    return (
        <AppBar
            position="static"
            style={{
                background: "transparent",
                boxShadow: "none",
            }}
        >
            <Toolbar
                style={{ display: "flex", alignItems: "center", padding: "0" }}
            >
                <img src="/logo.png" alt="logo" style={{ width: "100px" }} />
                <Typography
                    variant="h6"
                    style={{
                        color: "#E6AB09",
                        fontSize: "16px",
                        marginLeft: "40px",
                        cursor: "pointer",
                    }}
                    onClick={() => router.push("/pokemon")}
                >
                    Home
                </Typography>
                {/* <Typography
                    variant="h6"
                    style={{
                        marginLeft: "40px",
                        fontSize: "16px",
                        color: "black",
                        cursor: "pointer",
                    }}
                >
                    Pokemon Type
                </Typography> */}
            </Toolbar>
        </AppBar>
    );
};
export default Header;
