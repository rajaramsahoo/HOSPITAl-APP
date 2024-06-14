import { Route, Routes } from "react-router-dom";
import Homepage from "./page/homepage/Homepage";
import Deandashboard from "./page/dashboard/Deandashboard";
import Doctors from "./components/doctors/Doctors";
import SingleDoctor from "./components/doctors/SingleDoctor";
import CreateDoctor from "./components/doctors/CreateDoctor";
import CreateReceptionist from "./components/receptionist/CreateReceptionist";
import Receptionists from "./components/receptionist/Receptionists";
import SingleReceptionist from './components/receptionist/SingleReceptionist';
import Patients from "./components/patient/Patients";
import DeanProfile from "./components/dean/DeanProfile";
import Doctordashboard from './page/dashboard/Doctordashboard';
import OnlyViewDoctors from "./components/doctors/OnlyViewDoctors";
import Receptionistdashboard from "./page/dashboard/Receptionistdashboard";
import CreatePatient from "./components/patient/CreatePatient";
// import { useNavigate } from "react-router-dom";
function App() {
//private route for dean which contain role === dean ,,, <privateDeanRoute>
// const navigate = useNavigate()
// const privateRoute = ({}) => {
//   const auth = JSON.parse(localStorage.getItem('auth'))
//   if(auth.role === "dean"){
//     navigate("/")
//   }
//   else if(auth.role === "doctor"){}
//   else if(auth.role === "doctor"){}
//   else navigate("/")
// }
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/deandashboard" element={<Deandashboard />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:referenceNo" element={<SingleDoctor />} />
      <Route path="/doctors/createdoctor" element={<CreateDoctor />} />
      <Route path="/receptionist/createreceptionist" element={<CreateReceptionist />} />
      <Route path="/receptionists" element={<Receptionists />} />
      <Route path="/receptionists/:referenceNo" element={<SingleReceptionist />} />
      <Route path="/deandashboard/profile" element={<DeanProfile />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/patients/createpatient" element={<CreatePatient />} />

      <Route path="/doctordashboard" element={<Doctordashboard />} />
      <Route path="/view/doctors" element={<OnlyViewDoctors />} />
      <Route path="/receptionist" element={<Receptionists />} />
      <Route path="/receptionist/createreceptionist" element={<CreateReceptionist />} />
<Route path="/receptionistdashboard" element={<Receptionistdashboard/>}/>
    </Routes>
  );
}

export default App;
