import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, Button } from '@material-ui/core'
import Web3 from 'web3'
import { useWeb3React } from "@web3-react/core";
import { connectorsByName } from "utils/web3React";

declare let window: any;

const Topbar: React.FC = () => {
    const { activate, account } = useWeb3React();

    const loadWeb3 = async () => {
        if (window.ethereum)
            window.web3 = new Web3(window.ethereum);
    }

    const login = () => {
        const connector = connectorsByName['injected'];
        if (connector) {
            activate(connector, (error: Error) => alert(error.name + ' ' + error.message))
        } else {
            alert('The connector config is wriong')
        }
    }

    const handleConnect = async () => {
        try {
            await login();
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0x4" }]
                    // params: [{ chainId: "0xFC9C" }]
                })
                await loadWeb3()
            } catch (err: any) {

            }
        } catch (error: any) {
            console.log("Error = ", error)
        }
    }

    return (
        <StyledContainer>
            <Box>
                {!account && (
                    <Button variant="contained" color="primary" onClick={handleConnect}>
                        Connect Metamask
                    </Button>)
                }
                {account && (
                    <Button variant="contained" color="primary">
                        {account.substring(0, 3) + '...' + account.substring(account.length - 4)}
                    </Button>)
                }
            </Box>
        </StyledContainer>
    );
}

const StyledContainer = styled(Box)`
    height : 70px ;
    border-bottom : 1px solid #2c2727 ;
    display : flex ;
    background : #1c0e52 ;
    align-items : center ;
    justify-content : right ;
    padding-right : 50px ;
`

export default Topbar;