import { GrLocation } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";

export default function Ticketcard(props){
    const ticket = props.ticket

    return(
        <div className="w-full h-[250px] cursor-pointer hover:shadow-md transition-shadow border border-gray-300 p-6 rounded-2xl space-y-2 relative">
            <div className="flex gap-4 items-center">
                <span>{ticket.ticket_number}</span>
                <span className="p-1 px-2 bg-[#fef9c1] text-[#90722b] rounded-lg text-sm">{ticket.status}</span>
                <span className="p-1 px-2 bg-[#fee9d4] text-[#8a562c] rounded-lg text-sm">{ticket.priority}</span>
            </div>
            <h1 className="text-lg">{ticket.title}</h1>
            <div className="absolute bottom-4 mt-4 gap-4 flex flex-col">
                <span className="text-gray-600">{ticket.description}</span>
                <div className="flex gap-50 text-gray-600">
                    <div className="flex flex-col">
                        <span className="flex gap-2 items-center"><GrLocation/>{ticket.location}</span>
                        <span className="flex gap-2 items-center"><FiUser/>{ticket.tenant_name}</span>
                    </div>
                    <div className="flex flex-col ">
                        <span className="flex gap-2 items-center"><BsExclamationCircle/>{ticket.category}</span>
                        <span className="flex gap-2 items-center"><GoClock/>{ticket.created_at}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}