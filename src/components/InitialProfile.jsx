import React from "react";
import randomColor from "randomcolor";

export const generateProfile = (username) => {
    if (typeof username !== 'string' || username.length === 0) {
        throw new Error('Invalid username');
    }

    const color = randomColor({hue: 'green'});
    const initial = username.charAt(0);
    return {color, initial};
}

const InitialProfile = ({data}) => {
    const {initial, color} = data;
    return (
        <div className="aspect-square w-12 rounded-full flex justify-center items-center hover:cursor-pointer" style={{backgroundColor: color}}>
            <p className="text-center font-extrabold text-3xl cursor-default select-none hover:cursor-pointer">{initial}</p>
        </div>
    )
}

export default InitialProfile;