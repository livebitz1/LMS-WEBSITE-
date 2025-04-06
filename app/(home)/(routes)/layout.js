"use client";

import React from 'react';
import SideBarNav from './../components/SideBarNav';
import Header from './../components/Header';

function HomeLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <SideBarNav />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomeLayout;
