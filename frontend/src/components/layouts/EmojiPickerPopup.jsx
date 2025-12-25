import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='relative mb-6'>
            <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-600 text-white rounded-lg border border-purple-700 shadow-md overflow-hidden">
                    {icon ? (
                        <img src={icon} alt='Icon' className='w-full h-full object-contain' />
                    ) : (
                        <LuImage />
                    )}
                </div>
                <p className='font-medium text-black'>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                <div className='absolute top-16 z-50'>
                    <button
                        className='w-7 h-7 flex items-center justify-center bg-white text-black border border-gray-300 rounded-full absolute -top-3 -right-3 shadow hover:bg-gray-100 transition'
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX />
                    </button>
                    <EmojiPicker
                        onEmojiClick={(emoji) => {
                            onSelect(emoji?.imageUrl || "");
                            setIsOpen(false); // optional auto-close after selection
                        }}
                        height={350}
                        width={300}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup;
