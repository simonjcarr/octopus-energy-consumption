import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className="p-5 bg-pink-500 text-sm uppercase">
      <div className='flex space-x-4'>
        <Link href='/day/2' className='p-2 bg-pink-800 text-white rounded-lg'>Day</Link>
        <Link href='/week/1' className='p-2  bg-pink-800 text-white rounded-lg'>Week</Link>
        <Link href='/monoth-to-date' className='p-2  bg-pink-800 text-white rounded-lg'>Month</Link>
      </div>
    </header>
  )
}

export default Header
