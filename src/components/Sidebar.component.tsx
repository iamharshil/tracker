import { SiProgress } from "react-icons/si";
import { BiPlus } from "react-icons/bi";
import { FaRegFolder } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5"; // Replace IoChatboxOutline with IoChatbubblesOutline
import { IoAt } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
	MdFolderOpen,
	MdChatBubbleOutline,
	MdAlternateEmail,
	MdNotifications,
} from "react-icons/md";
import Link from "next/link";

export default function SidebarComponent() {
	return (
		<div className="w-24 flex flex-col items-center justify-start p-3 bg-[#fafaf5] shadow border-r-2 border-[#ecece7]">
			<div className="flex items-center mt-6">
				<span>
					<SiProgress className="text-4xl" />
				</span>
			</div>
			{/* horizontal divider */}
			<span className="w-11 h-px bg-slate-200  my-6" />

			<div className="flex flex-col items-center">
				<Link href="/">
					<span className="w-8 h-8 my-1 rounded-md bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
						<MdFolderOpen className="text-white text-2xl" />
					</span>
				</Link>
				<Link href="/chat">
					<span className="w-8 h-8 my-1 flex text-gray-400 font-bold items-center justify-center hover:text-blue-500 transition-colors duration-300">
						<MdChatBubbleOutline className="text-2xl" />{" "}
					</span>
				</Link>
				<Link href="/mail">
					<span className="w-8 h-8 my-1 flex text-gray-400 font-bold items-center justify-center hover:text-blue-500 transition-colors duration-300">
						<MdAlternateEmail className="text-2xl" />
					</span>
				</Link>
				<Link href="/notifications">
					<span className="w-8 h-8 my-1 flex text-gray-400 font-bold items-center justify-center relative hover:text-blue-500 transition-colors duration-300">
						<MdNotifications className="text-2xl" />
						<span className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0" />
					</span>
				</Link>
			</div>
			<span className="w-11 h-px bg-slate-200  my-6" />

			<div className="flex flex-col items-center">
				{/* Horizontal line */}

				{/* User profiles */}
				<div className="flex flex-col items-center space-y-2">
					{/* User profile 1 */}
					<div className="w-8 h-8 rounded-full bg-gray-300" />
					{/* User profile 2 */}
					<div className="w-8 h-8 rounded-full bg-gray-300" />
					{/* User profile 3 */}
					<div className="w-8 h-8 rounded-full bg-gray-300" />
					{/* User profile 4 */}
					<div className="w-8 h-8 rounded-full bg-gray-300" />
				</div>

				{/* Plus icon */}
				<BiPlus className="text-2xl cursor-pointer" />
			</div>
		</div>
	);
}
