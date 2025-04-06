"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Layout, Shield, Mail } from 'lucide-react';

function SideBarNav() {

  const menuList = [
    {
      id: 1,
      name: 'Browse',
      icon: Search, // This will now refer to the correct icon component
      path: '/browse'
    },
    {
      id: 2,
      name: 'Dashboard',
      icon: Layout,
      path: '/dashboard'
    },
    {
      id: 3,
      name: 'Upgrade',
      icon: Shield,
      path: '/upgrade'
    },
    {
      id: 4,
      name: 'NewsLetter',
      icon: Mail,
      path: '/newsletter'
    },
  ];

  const [activeIndex , setActiveIndex] = useState(0);

  return (
    <div className="h-full bg-white border-r flex flex-col overflow-y-auto shadow-md">
      <div className="p-5 border-b">
        <Image
          src="/logo.svg" // Correct the src path to be relative if the file is in the public directory
          alt="Logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col">
        {menuList.map((item, index) => (
          <div 
            key={item.id}  // Adding a unique key prop to each child element
            className={`flex gap-2 items-center px-6 p-4
             hover:bg-gray-100 cursor-pointer ${activeIndex==index? 'bg-purple-50 text-purple-800': null}`}
          
            onClick={() => setActiveIndex(index)}
          >
            <item.icon size={20} /> 
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBarNav;
