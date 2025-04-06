'use client'

import React, { useEffect } from 'react'
import SearchBar from './SearchBar'
import { UserButton, useUser, SignInButton, useClerk } from '@clerk/nextjs'

function Header() {
    const { user } = useUser()
    const { signOut } = useClerk()  // Correct way to use signOut

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <div className='p-6 border-b flex justify-between items-center bg-white shadow-md'>
            {/* SearchBar on the left */}
            <SearchBar />

            {/* Right side: User icon or Login button */}
            <div className='flex items-center gap-4'>
                {!user ? (
                    <SignInButton mode="modal">
                        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                            Login
                        </button>
                    </SignInButton>
                ) : (
                    <>
                        <button
                            onClick={() => signOut()}  // Correct function usage
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Sign Out
                        </button>

                        <UserButton afterSignOutUrl="/" className="h-10 w-10" />
                    </>
                )}
            </div>
        </div>
    )
}

export default Header
