import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import styled from "styled-components";
import { useTokenContract } from "hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Token = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [warningMsg, setWarningMsg] = useState('');

  const [mintAddress, setMintAddress] = useState("");
  const [mintAmount, setMintAmount] = useState(0);
  const [burnAddress, setBurnAddress] = useState("");
  const [burnAmount, setBurnAmount] = useState(0);

  const tokenContract = useTokenContract();
  const { account } = useWeb3React();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleChangeMintAddress = (event: any) => {
    setMintAddress(event.target.value)
  }

  const handleChangeBurnAddress = (event: any) => {
    setBurnAddress(event.target.value)
  }

  const handleChangeMintAmount = (event: any) => {
    setMintAmount(Number(event.target.value));
  }

  const handleChangeBurnAmount = (event: any) => {
    setBurnAmount(Number(event.target.value));
  }

  const isAddress = (_address: string) => {
    const pattern = /^(0x)?[0-9a-f]{40}$/i
    if (pattern.test(_address)) {
      return true;
    } else {
      return false;
    }
  }

  const mintToken = async () => {
    if (!isAddress(mintAddress)) {
      setWarningMsg('Please input the correct address');
      setOpen(true);
      return;
    }
    if (!tokenContract) {
      // setWarningMsg('Please input the correct address');
      return;
    }
    if (!account) {
      setOpen(true);
      setWarningMsg('Please connect the metamask');
      return;
    }
    await tokenContract.mint(mintAddress, BigNumber.from(mintAmount).mul(BigNumber.from(10).pow(18))).send({ from: account });
    await saveMintHistory(account)
  }

  const saveMintHistory = async (_address : string) => {
    const url = process.env.REACT_APP_SERVER_URL + "/api/token/insertData";
    const data = {
      address : _address,
      actiontype : 'mint',
      amount : mintAmount,
      toaddress : mintAddress
    }
    const rlt = await axios.post(url, data);
  }

  const burnToken = async () => {
    if (!isAddress(mintAddress)) {
      setWarningMsg('Please input the correct address');
      setOpen(true);
      return;
    }
    if (!tokenContract) {
      // setWarningMsg('Please input the correct address');
      return;
    }
    if (!account) {
      setOpen(true);
      setWarningMsg('Please connect the metamask');
      return;
    }
    await tokenContract.burn(burnAddress, BigNumber.from(burnAmount).mul(BigNumber.from(10).pow(18))).send({ from: account });
    await saveBurnHistory(account);
  }

  const saveBurnHistory = async (_address : string) => {
    const url = process.env.REACT_APP_SERVER_URL + "/api/token/insertData";
    const data = {
      address : _address,
      actiontype : 'burn',
      amount : burnAmount,
      toaddress : burnAddress
    }
    const rlt = await axios.post(url, data);
  }

  return (
    <Container>
      <Box display={`flex`} justifyContent={`center`} width={`100%`} mt={`50px`}>
        <MintBox>
          <Box fontSize={`30px`} textAlign={`center`} fontWeight={700}>
            Mint
          </Box>
          <Box mt={`20px`}>
            Mint Address :
            <input value={mintAddress} onChange={handleChangeMintAddress} style={{ marginTop: '10px', width: '100%', outline: 'none', color: 'black' }} />
          </Box>
          <Box mt={`20px`}>
            Mint Amount :
            <input value={mintAmount} onChange={handleChangeMintAmount} style={{ marginTop: '10px', width: '100%', outline: 'none', color: 'black' }} />
          </Box>
          <Box mt={`50px`} mb={`20px`}>
            <Button variant="contained" color="primary" style={{ width: '100%' }} onClick={mintToken}>Mint</Button>
          </Box>
        </MintBox>
        <MintBox ml={`50px`}>
          <Box fontSize={`30px`} textAlign={`center`} fontWeight={700}>
            Burn
          </Box>
          <Box mt={`20px`}>
            Burn Address :
            <input value={burnAddress} onChange={handleChangeBurnAddress} style={{ marginTop: '10px', width: '100%', outline: 'none', color: 'black' }} />
          </Box>
          <Box mt={`20px`}>
            Burn Amount :
            <input value={burnAmount} onChange={handleChangeBurnAmount} style={{ marginTop: '10px', width: '100%', outline: 'none', color: 'black' }} />
          </Box>
          <Box mt={`50px`} mb={`20px`}>
            <Button variant="contained" color="primary" style={{ width: '100%' }} onClick={burnToken}>Burn</Button>
          </Box>
        </MintBox>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          {warningMsg}
        </Alert>
      </Snackbar>
    </Container>
  )
}
const Container = styled(Box)`
  width : calc(100% - 300px);
  margin-left : 300px ;
  height : calc(100vh - 70px);
  padding : 20px ;
  display : flex ;
`

const MintBox = styled(Box)`
  background : linear-gradient(316deg, #0d153a, #3a258f00);
  border: 1px solid #16166a;
  border-radius: 50px;
  width : 400px;
  height : 400px;
  color : white;
  padding : 20px ;
  display : flex ;
  flex-direction : column ;
  justify-content : space-around ;
  box-shadow: 2px 2px 5px #231d56;
`

export default Token;