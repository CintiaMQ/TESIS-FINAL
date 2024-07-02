import { IoBarChartSharp, IoClipboard, IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { RiVideoFill } from "react-icons/ri";

type navegacionType = {
	id: number;
	url: string;
	icono: JSX.Element;
	label: string;
};

const Aside = ({ asideActivo }: { asideActivo: boolean }) => {
	const navegacion: navegacionType[] = [
		{
			id: 1,
			url: "/dashboard",
			icono: <IoHome size={22} />,
			label: "Inicio",
		},
		{
			id: 2,
			url: "/dashboard/test",
			icono: <IoClipboard size={22} />,
			label: "Test",
		},
		{
			id: 3,
			url: "/dashboard/resultados",
			icono: <IoBarChartSharp size={22} />,
			label: "Resultados",
		},
		{
			id: 4,
			url: "/dashboard/videos",
			icono: <RiVideoFill size={22} />,
			label: "Videos",
		},
	];

	return (
		<div
			className={cn(
				"bg-[#6a77b4]  text-white overflow-hidden transition-all ease-linear",
				asideActivo ? "w-[250px]" : "w-[60px]"
			)}
		>
			<div className='w-full h-[70px] flex justify-center items-center'>
				<div className='relative h-[65px] w-full object-contain'>
					<img
						src={
							asideActivo
								? "/images/logo.png"
								: "/images/logotipo.png"
						}
						alt='logo'
						className='absolute w-full h-full top-0 left-0 object-contain'
					/>
				</div>
			</div>
			<nav className='pt-10'>
				<ul>
					{navegacion.map((navitem) => (
						<NavItem
							key={navitem.id}
							url={navitem.url}
							icono={navitem.icono}
							label={navitem.label}
							asideActivo={asideActivo}
						/>
					))}
				</ul>
			</nav>
		</div>
	);
};

interface NavItemContrato {
	url?: string | null;
	icono: JSX.Element;
	label: string;
	asideActivo: boolean;
}

const NavItem = ({ url, icono, label, asideActivo }: NavItemContrato) => {
	return (
		<li className='w-full pl-2 h-[50px]'>
			<NavLink
				to={url || "#"}
				end={url === "/dashboard"}
				className={({ isActive }) =>
					cn(
						"relative flex items-center h-full gap-1.5 p-1 pl-2.5",
						isActive && "navlink-active"
					)
				}
			>
				{/* icono */}
				<div className=''>{icono}</div>
				{/* texto */}
				{asideActivo && <div className='text-lg'>{label}</div>}
			</NavLink>
		</li>
	);
};

export default Aside;
