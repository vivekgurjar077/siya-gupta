import React from "react"
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import { RiInstagramFill } from "react-icons/ri"

export const Footer = () => {
  return (
    <>
      <footer className='boxItems'>
        <div className='container flex'>
          <p>&copy; 2024 My Veiled Chronicles. All rights reserved.</p>
          <div className='social'>
            myveiledchronicless@gmail.com
            <a href="https://www.instagram.com/myveiledchronicles?igsh=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"><RiInstagramFill className='icon'/></a>
            
          </div>
        </div>
      </footer>
    </>
  )
}
