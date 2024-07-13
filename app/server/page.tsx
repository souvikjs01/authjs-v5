import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const Server = async() => {
    const session = await auth();

    if(!session?.user){
        redirect('/')
    }
  return (
    <div className=' flex flex-col justify-center items-center gap-2 h-full'>
      <h1 className=' text-2xl'>Server page</h1>
      <p className=' text-lg'>Protected Route from user Session</p>
      <p className=' text-lg'>{session?.user?.email}</p>
    </div>
  )
}

export default Server