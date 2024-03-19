"use client"

import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import DoctorDashboard from "@/components/DoctorDashboard/DoctorDashboard";
import PatientDashboard from "@/components/PatientDashboard/PatientDashboard";
import useIsAdmin from "@/hooks/useIsAdmin";
import useIsDoctor from "@/hooks/useIsDoctor";
import useIsPatient from "@/hooks/useIsPatient";

const Dashboard = () => {
    const [isDoctor, isDoctorLoading] = useIsDoctor();
    const [isPatient, isPatientLoading] = useIsPatient();
    const [isAdmin, isAdminLoading] = useIsAdmin();

    return (
        <div>
            {(!isDoctorLoading && isDoctor) &&  <DoctorDashboard /> } 
            {(!isPatientLoading && isPatient) &&  <PatientDashboard /> }
            {(!isAdminLoading && isAdmin) && <AdminDashboard />}
        </div>
    );
};

export default Dashboard;