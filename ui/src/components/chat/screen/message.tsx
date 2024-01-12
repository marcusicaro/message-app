import { useState } from "react";

export interface Message {
    text: string;
    sender: string;
    picture: string;
}

interface User {
    name: string;
}

export default function ChatScreenMessage(props: Message): JSX.Element {
    const [activeUser, setActiveUser] = useState<User>({name: 'Marcus'});
    return (
        <div data-sender={props.sender} className={`flex ${activeUser.name === props.sender ? "justify-start" : "justify-end"} mb-4`}>
            {activeUser.name !== props.sender && <div className={`ml-2 py-3 px-4 ${activeUser.name === props.sender ? "bg-gray-400" : "bg-blue-400"} rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white`}>
                {props.text}
            </div>}
            <img
                src={props.picture}
                className='object-cover h-8 w-8 rounded-full'
                alt=''
            />
            {activeUser.name === props.sender && <div className={`ml-2 py-3 px-4 ${activeUser.name === props.sender ? "bg-gray-400" : "bg-blue-400"} rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white`}>
                {props.text}
            </div>}
        </div>
    );
}
