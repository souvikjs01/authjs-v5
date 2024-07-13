"use client"

import React from 'react'
import AuthButton from './AuthButton'
import { loginWithCreds } from '@/actions/authAction'

const LoginForm = () => {
  return (
    <div>
      <form action={loginWithCreds} className=' w-full flex flex-col gap-4'>
        <div>
            <label htmlFor='email' className=' block text-sm font-medium'>Email</label>
            <input type='email' placeholder='Email' id='email' name='email' className=' mt-1 w-full px-4 py-2 rounded-md border border-gray-200 text-sm text-gray-700'/>
        </div>
        <div>
            <label htmlFor='password' className=' block text-sm font-medium'>Password</label>
            <input type='password' placeholder='Password' id='password' name='password' className=' mt-1 w-full px-4 py-2 rounded-md border border-gray-200 text-sm text-gray-700'/>
        </div>
        <div className=' mt-4'>
            <AuthButton />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
