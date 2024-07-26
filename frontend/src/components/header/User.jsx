import React, { useContext, useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { BsBagCheck } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"
import { RiImageAddLine } from "react-icons/ri"
import { Context } from "../../context/Context"
import { Link } from "react-router-dom"

export const User = () => {
  const { user, dispatch } = useContext(Context)
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }
  const [profileOpen, setProfileOpen] = useState(false)
  const close = () => {
    setProfileOpen(false)
  }

  const PublicFlo = "http://localhost:5000/images/"

  return (
    <>
      <div className='profile'>
        {user ? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              <img src={PublicFlo + user.profilePic} alt='' />
            </button>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                <Link to={"/account"}>
                  <div className='image'>
                    <div className='img'>
                      <img src={PublicFlo + user.profilePic} alt='' />
                    </div>
                    <div className='text'>
                      <h4>{user.username}</h4>
                    </div>
                  </div> 
                </Link>
                <Link to='/create'>
                  <button className='box'>
                    <h4>Create Journal</h4>
                  </button>
                </Link>
                <Link to='/my-blogs'>
                  <button className='box'>
                    <h4>Your Journal</h4>
                  </button>
                </Link>
                <Link to='/about-us'>
                  <button className='box'>
                    <h4>About Us</h4>
                  </button>
                </Link>
                <button className='box' onClick={handleLogout}>
                  <BiLogOut className='icon' />
                  {user && <h4>Log Out</h4>}
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to='/login'>
            <button className="acc-btn">My Account</button>
          </Link>
        )}
      </div>
    </>
  )
}
