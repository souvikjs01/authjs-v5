import { auth } from '@/auth'
import Link from 'next/link'
import React from 'react'
import Logout from './Logout';
import Image from 'next/image';

const Navbar = async() => {
    const session = await auth();
  return (
    <nav className=' border-b bg-background w-full flex items-center'>
        <div className=' flex w-full items-center justify-between my-4'>
            <Link href='/' className=' font-semibold text-xl'>Home</Link>

            <div className=' flex items-center gap-x-5'>
                <Link href='/middleware'>Middleware</Link>
                <Link href='/server'>Server</Link>
            </div>

            <div className=' flex items-center gap-x-4'>
                {!session?.user ? (
                    <Link href='/sign-in'>
                        <div className=' bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-sm'>Login</div>
                    </Link>
                ) : (
                    <>
                        <div className=' flex justify-center items-center gap-x-2'>
                            {session?.user.name || session?.user.email}
                            {session?.user.image && (
                                <Image 
                                    className=' rounded-full '
                                    src={session?.user.image || ""}
                                    width={30}
                                    height={30}
                                    alt='Avatar'
                                />
                            )}
                        </div>
                        <Logout />
                    </>
                )}
                
            </div>
        </div>
    </nav>
  )
}

export default Navbar
