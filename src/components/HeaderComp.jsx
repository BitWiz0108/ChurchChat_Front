import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Typography, IconButton} from "@mui/material";

import Header from "./Header";

const HeaderComp = (props) => {
  const username = localStorage.getItem("username");
  const userrole = localStorage.getItem("userrole");
  const navigate = useNavigate();
  const onSignOut = () => {
    localStorage.removeItem("tkn");
    navigate("/signin");
  };
  
  const onGoDashboard = () => {
    navigate("/dashboard");
  };
  
  const onGoSettings = () => {
    navigate("/settings");
  }

  const onGoHome = () => {
    navigate("/");
  }
  return (
  <Header bg borderBottom>
    <Box sx={{ width: "100%", height: "100%", position: "relative", paddingX: 2, maxWidth: "md" }}>
      <Typography variant="h6" fontWeight="700" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        {username}
      </Typography>
      {userrole == 2 && <IconButton onClick={onGoHome} sx={{ position: "absolute", top: "50%", right: "140px", transform: "translateY(-50%)" }} > <HomeIcon /> </IconButton>}
      {userrole == 2 &&  <IconButton onClick={onGoDashboard} sx={{ position: "absolute", top: "50%", right: "100px", transform: "translateY(-50%)" }} > <DashboardCustomizeIcon /> </IconButton>} 
      {userrole == 2 && <IconButton onClick={onGoSettings} sx={{ position: "absolute", top: "50%", right: "60px", transform: "translateY(-50%)" }} > <SettingsIcon /> </IconButton>}
      <IconButton onClick={onSignOut} sx={{ position: "absolute", top: "50%", right: "20px", transform: "translateY(-50%)" }} > <LogoutOutlinedIcon /> </IconButton>
    </Box>
  </Header>
  );
};

export default HeaderComp;


