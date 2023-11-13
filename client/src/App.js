import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/fSection/fishingChart";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import LoginPage from "scenes/login";
import ManagementUsers from "scenes/aFSection/managementUsers";
import ManagementAquacultureUsers from "scenes/aFSection/managementUsers";
import AquacultureFarms from "scenes/aFSection/aquacultureFarms";
import AquacultureFarmers from "scenes/aFSection/aquacultureFarmers";
import FisheriesManagementUsers from "scenes/fSection/fisheriesManagementUsers";
import Fishermens from "scenes/fSection/fishermens";
import FishProcessors from "scenes/fSection/fishProcessors";
import Exporters from "scenes/exporters";
import AquacultureManagement from "scenes/aFSData/aquacultureManagement";
import FarmsData from "scenes/aFSData/farmsData";
import FarmersData from "scenes/aFSData/farmersData";
import FisheriesManagement from "scenes/fData/fisheriesManagement";
import FishermensData from "scenes/fData/fishermensData";
import FishProcessorsData from "scenes/fData/fishProcessorsData";
import UserProfile from "scenes/userProfile";
import Profile from "components/Profile";
import RegisterManagementUsers from "scenes/registerManagementUsers";
import { UserContextProvider } from "./UserContext";
import UserProfileEdit from "scenes/useProfileEdit";
import RemoveUsers from "scenes/removeUsers";
import ActivateUsers from "scenes/activateUsers";
import KnowledgeCenterData from "scenes/knowledgeCenter";
import Message from "scenes/messages";
import ContactUs from "scenes/contactUs";
import UpdateArticle from "scenes/article/update";
import AddArticle from "scenes/article/addArticle";
import UpdateKnowledgeCenter from "scenes/knowledgeCenter/update";
import EnterFAQSData from "scenes/faqs/add";
import UpdateFAQ from "scenes/faqs/delete";
import DistrictAquaculturist from "scenes/aFSection/districtAquaCulturist";
import FishermenDashboard from "components/FishermenDashboard";
import FarmingDashboard from "components/FarmingDashboard";
import FishOverview from "scenes/fSection/overview";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      
      <BrowserRouter>
      <UserContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            
              <Route path="/" element={<LoginPage />} />
              <Route path="userProfile" element={<UserProfile/>} />
              <Route path="userProfileEdit" element={<UserProfileEdit/>} />
              <Route path="registerManagementUsers" element={<RegisterManagementUsers/>} />
              <Route path="/enterknowledgecenterdata" element={<KnowledgeCenterData />} />
              <Route path="/addarticle" element={<AddArticle />} />
              <Route path="/enterfaqsdata" element={<EnterFAQSData />} />
              <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/fishingdashboard" element={<FishermenDashboard />} />
              <Route path="/farmingdashboard" element={<FarmingDashboard />} />
              <Route path="/managementusers" element={<ManagementAquacultureUsers />} />
              <Route path="/aquacultureFarms" element={<AquacultureFarms />} />
              <Route path="aquacultureFarmers" element={<AquacultureFarmers/>} />
              <Route path="fisheriesManagementUsers" element={<FisheriesManagementUsers/>} />
              <Route path="fishermens" element={<Fishermens/>} />
              <Route path="processors" element={<FishProcessors/>} />
              <Route path="aquacultureManagement" element={<AquacultureManagement/>} />
              <Route path="farmschart" element={<FarmsData/>} />
              <Route path="farmersData" element={<FarmersData/>} />
              <Route path="fisheriesManagement" element={<FisheriesManagement/>} />
              <Route path="fishermensData" element={<FishermensData/>} />
              <Route path="fishProcessorsData" element={<FishProcessorsData/>} />
              <Route path="profile" element={<Profile/>} />
              <Route path="exporters" element={<Exporters/>} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/farmoverview" element={<Overview />} />
              <Route path="/fishoverview" element={<FishOverview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/fishingchart" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/removeUsers" element={<RemoveUsers />} />
              <Route path="/activateUsers" element={<ActivateUsers />} />
              <Route path="/messages" element={<Message />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/updateanddelete" element={<UpdateArticle />} />
              <Route path="/deleteandupdate" element={<UpdateKnowledgeCenter />} />
              <Route path="/delete&update" element={<UpdateFAQ />} />
              <Route path="/districtaquaculturist" element={<DistrictAquaculturist />} />
              
              
            </Route>
          </Routes>
        </ThemeProvider>
        </UserContextProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
