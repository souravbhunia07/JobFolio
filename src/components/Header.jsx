import React from 'react'
import { Link } from 'react-router-dom'
import image from "../../public/jobfolio.png"
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

const Header = () => {
  return (
    <>
      <nav className='py-4 flex justify-between items-center'>
        <Link>
          <img src={image} className='h-10' />
        </Link>

        <Button variant="outline">Login</Button>
        
        {/* <header>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header> */}
      </nav>
    </>
  )
}

export default Header