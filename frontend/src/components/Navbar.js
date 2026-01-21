import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import './NavBar.css';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/about">
                        About
                    </Button>
                    <Button color="inherit" component={Link} to="/transacoes">
                        Transações
                    </Button>
                    <Button color="inherit" component={Link} to="/extrato">
                        Extrato
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;