import { useState } from "react";
import Aside from "../ui/Aside";
import MainSection from "../ui/MainSection";

const Dashboard = () => {
	// [valordelestado, seteovalorestado]
	const [asideActivo, setAsideActivo] = useState(true);

	return (
		<div className='grid grid-cols-[auto_1fr] h-screen'>
			{/* aside */}
			<Aside asideActivo={asideActivo} />
			{/* main */}
			<MainSection
				asideActivo={asideActivo}
				setAsideActivo={setAsideActivo}
			/>
		</div>
	);
};

export default Dashboard;
