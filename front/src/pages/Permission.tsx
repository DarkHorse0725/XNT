import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import styled from "styled-components";
import PermissionUserTable from "components/permission/PermissionUserTable";
import { useWeb3React } from "@web3-react/core";
import { useTokenContract } from "hooks/useContract";
import { BigNumber } from "ethers";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import axios from 'axios';
import { makeStyles, Theme } from '@material-ui/core/styles';

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


const Permission = () => {
  const [userAddress, setUserAddress] = useState("");
  const [memberList, setMemberList] = useState([]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [warningMsg, setWarningMsg] = useState('');

  const tokenContract = useTokenContract();
  const { account } = useWeb3React();

  const handlePermissionUserAddress = (event: any) => {
    setUserAddress(event.target.value)
  }

  const isAddress = (_address: string) => {
    const pattern = /^(0x)?[0-9a-f]{40}$/i
    if (pattern.test(_address)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    console.log("ok")
    getMemberList();
  }, [])

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handlePermission = async () => {
    if (!isAddress(userAddress)) {
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
    await tokenContract.addMember(userAddress).send({ from: account });
    await addMember(userAddress);

  } 

  const handleDeleteMember = async (_address : string) => {
    if (!tokenContract) {
      setOpen(true);
      setWarningMsg('Please connect the metamask');
      return;
    }
    await tokenContract.removeMember(_address).send({ from: account });
    await deleteMember(_address);
  }

  const addMember = async (_address : string) => {
    const url = process.env.REACT_APP_SERVER_URL + "/api/token/insertNewMember";
    const data = {
      address : _address
    }
    const rlt = await axios.post(url, data);
    console.log("Rlt = ", rlt)
  }

  const deleteMember = async(_address : string) => {
    const url = process.env.REACT_APP_SERVER_URL + "/api/token/deleteMember";
    const data = {
      address : _address
    }
    const rlt = await axios.post(url, data);
  }

  const getMemberList = async () => {
    const url = process.env.REACT_APP_SERVER_URL + "/api/token/getMemberList";
    const rlt = await axios.post(url);
    console.log("list Rlt = ", rlt.data)
    setMemberList(rlt.data.data)
  }

  return (
    <Container>
      <Box display={`flex`} justifyContent={`center`} width={`100%`}>
        <PermissionUserTable data={memberList} deleteMember={handleDeleteMember}/>
        <MintBox ml={`50px`}>
          <Box fontSize={`30px`} textAlign={`center`} fontWeight={700}>
            Permission
          </Box>
          <Box mt={`20px`}>
            User Address :
            <input value={userAddress} onChange={handlePermissionUserAddress} style={{ marginTop: '10px', width: '100%', outline: 'none', color: 'black' }} />
          </Box>
          <Box mt={`30px`}>
            <Button variant="contained" color="primary" style={{ width: '100%' }} onClick={handlePermission}>Apply</Button>
          </Box>
        </MintBox>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          {warningMsg}
        </Alert>
      </Snackbar>
      </Box>
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
  border: 1px solid #0f0f68;
  border-radius: 50px;
  width : 400px;
  height : 250px;
  color : white;
  padding : 20px ;
  display : flex ;
  flex-direction : column ;
  justify-content : space-around ;
  box-shadow: 2px 2px 5px #483e5c;
`

export default Permission;