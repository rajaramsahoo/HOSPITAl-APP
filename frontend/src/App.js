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
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/deandashboard" element={<Deandashboard />} />
      <Route path="/deandashboard/doctors" element={<Doctors />} />
      <Route path="/deandashboard/doctors/:referenceNo" element={<SingleDoctor />} />
      <Route path="/deandashboard/doctors/createdoctor" element={<CreateDoctor />} />
      <Route path="/deandashboard/receptionist/createreceptionist" element={<CreateReceptionist />} />
      <Route path="/deandashboard/receptionists" element={<Receptionists />} />
      <Route path="/deandashboard/receptionists/:referenceNo" element={<SingleReceptionist />} />
      <Route path="/deandashboard/profile" element={<DeanProfile />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/deandashboard" element={<Deandashboard />} />
      <Route path="/doctordashboard" element={<Doctordashboard />} />
      <Route path="/doctors" element={<OnlyViewDoctors />} />
      <Route path="/receptionist" element={<Receptionists />} />

    </Routes>
  );
}

export default App;
