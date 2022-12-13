import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connectorsByName } from "utils/web3React";
import { useWeb3React } from "@web3-react/core";
import PermissionTable from "components/home/PermissionTable";
import { BigNumber } from "ethers";
import { useTokenContract } from "hooks/useContract";
import axios from 'axios';
import Web3 from "web3";


const Dashborad = () => {
  const { activate, account } = useWeb3React();
  useEffect(() => {
    
  }, [])
  const tokenContract = useTokenContract();

  const [totalSupply, setTotalSupply] = useState(0);
  const [burnAmount, setBurnAmount] = useState(0);
  const [mintAmount, setMintAmount] = useState(0);
  const [lastBurnData, setLastBurnData] = useState<any>(null);
  const [lastMintData, setLastMintData] = useState<any>(null);
  const [recentData, setRecentData] = useState([]);

  const init = async () => {
    getDashboardData();
    getRecentData();
    if(!tokenContract) return ;
    const _totalSupply = await tokenContract.totalSupply().call();
    
    setTotalSupply( parseFloat(Web3.utils.fromWei(_totalSupply)))
  }

  useEffect(() => {
    init()
  }, [tokenContract])

  const getDashboardData = async () => {
    const url = process.env.REACT_APP_SERVER_URL + "/api/token/getDashboardData";
    const rlt = await axios.post(url);
    console.log("dashboard Rlt = ", rlt.data)
    if(rlt.data.amount[0]._id === "burn") {
      setBurnAmount(rlt.data.amount[0].TotalSum);
      setMintAmount(rlt.data.amount[1].TotalSum);
    } else {
      setBurnAmount(rlt.data.amount[1].TotalSum);
      setMintAmount(rlt.data.amount[0].TotalSum);
    }
    setLastBurnData(rlt.data.last_burn[0]);
    setLastMintData(rlt.data.last_mint[0]);
  }

  const getRecentData = async() => {
    const url = process.env.REACT_APP_SERVER_URL + "/api/token/getRecentData";
    const rlt = await axios.post(url);
    setRecentData(rlt.data);
    console.log("recent Rlt = ", rlt.data)
  }

  const digitFormat = (num: number) => {
    return num > 9 ? num : '0' + num;
  }

  const dateFormat = (_date: string) => {
    const newDate = new Date(_date);
    return newDate.getFullYear() + "-" +
      digitFormat(newDate.getMonth() + 1) + "-" +
      digitFormat(newDate.getDate()) + " " +
      digitFormat(newDate.getHours()) + ":" +
      digitFormat(newDate.getMinutes()) + ":" +
      digitFormat(newDate.getSeconds());
  }

  return (
    <DashboardContainer>
      <Summary>
        <DesContainer>
          <Box display={`flex`} justifyContent={`space-between`}>
            <Box>
              Total Supply :
            </Box>
            <Box>
              {totalSupply}
            </Box>
          </Box>
          <Box display={`flex`} justifyContent={`space-between`}>
            <Box>
              Contract :
            </Box>
            <Box>
              {process.env.REACT_APP_CONTRACT_ADDRESS?.substring(0, 5) + '...' + process.env.REACT_APP_CONTRACT_ADDRESS?.substring(35)}
            </Box>
          </Box>
        </DesContainer>
        <DesContainer>
          <Box display={`flex`} justifyContent={`space-between`}>
            <Box>
              Mint Amount :
            </Box>
            <Box>
              {mintAmount}
            </Box>
          </Box>
          <Box display={`flex`} justifyContent={`space-between`}>
            <Box>
              Last Mint :
            </Box>
            <Box>
              {lastMintData && dateFormat(lastMintData.date)}
            </Box>
          </Box>
        </DesContainer>
        <DesContainer>
          <Box display={`flex`} justifyContent={`space-between`}>
            <Box>
              Burn Amount :
            </Box>
            <Box>
              {burnAmount}
            </Box>
          </Box>
          <Box display={`flex`} justifyContent={`space-between`}>
            <Box>
              Last Burn :
            </Box>
            <Box>
              {lastBurnData && dateFormat(lastBurnData.date)}
            </Box>
          </Box>
        </DesContainer>
      </Summary>
      <Box mt="20px">
        <Box fontSize={`20px`} color={`white`}>
          Recent History : 
        </Box>
        <PermissionTable data={recentData}/>
      </Box>
    </DashboardContainer>
  )
}

const DashboardContainer = styled(Box)`
  // background : #2f3138;
  width : calc(100% - 300px);
  margin-left : 300px ;
  height : calc(100vh - 70px);
  padding : 20px ;
`

const Summary = styled(Box)`
  display : flex ;
  justify-content : space-between ;
  width : 100% ;

`

const DesContainer = styled(Box)`
  background: rgb(27 18 62 / 70%);
  width : 30%;
  min-height : 120px ;
  color : white;
  padding : 20px ;
  display : flex ;
  flex-direction : column ;
  justify-content : space-around ;
  box-shadow: 2px 2px 5px #170e26;
`


export default Dashborad;