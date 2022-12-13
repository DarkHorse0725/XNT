import React, { useState } from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'
import {
    BrowserRouter as Router,
    Link,
    Route
} from "react-router-dom";

const Sidebar: React.FC = () => {
    const [activeItem, setActiveItem] = useState('home');
    return (
        <StyledContainer>
            <Box>
                Admin
            </Box>
            <Box>
                <MenuContainer>
                    <Link to={`/`}><MenuItems style={{background : activeItem === 'home' ? 'rgb(14 13 54 / 80%)' : 'transparent'}} onClick={() => setActiveItem('home')}>Home</MenuItems></Link>
                    <Link to={`/token`}><MenuItems  style={{background : activeItem === 'token' ? 'rgb(14 13 54 / 80%)' : 'transparent'}} onClick={() => setActiveItem('token')}>Mint / Burn</MenuItems></Link>
                    <Link to={`/permission`}><MenuItems  style={{background : activeItem === 'permission' ? 'rgb(14 13 54 / 80%)' : 'transparent'}} onClick={() => setActiveItem('permission')}>Permission</MenuItems></Link>
                </MenuContainer>
            </Box>
        </StyledContainer>
    );
}

const StyledContainer = styled(Box)`
    width: 300px;
    height: 100vh;
    background: rgb(21 9 66 / 50%);
    position: fixed;
    top: 0px;
    left: 0px;
    padding: 10px;
    border-radius: 0px 30px 30px 0px;
    >div:first-of-type {
        font-size : 40px ;
        font-weight : bolder ;
        color : white ;
        padding-left : 10px ;
    }
`

const MenuContainer = styled(Box)`
    padding-left : 20px; 
    margin-top : 20px ;
`
const MenuItems = styled(Box)`
    font-size : 20px ;
    color : white ;
    cursor : pointer ;
    padding : 10px ;
    background : transparent;
    &:hover {
        background : grey;
    }
`

export default Sidebar;