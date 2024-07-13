import { auth } from '@/auth'
import React from 'react'

const Middleware = async() => {
    const session = await auth();
  return (
    <div className=' flex flex-col justify-center items-center gap-2 h-full'>
      <h1 className=' text-2xl'>Middleware page</h1>
      <p className=' text-lg'>Protected route from middleware</p>
      <p className=' text-lg'>{session?.user?.email}</p>
    </div>
  )
}

export default Middleware