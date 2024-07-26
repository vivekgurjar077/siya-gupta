import React, { useState } from "react"
import "./login.css"
import axios from "axios"

export const Regsiter = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      })
      res.data && window.location.replace("/login")
    } catch (error) {
      setError(true)
    }
  }
  return (
    <>
      <section className='login'>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <span>Username *</span>
            <input type='text' required onChange={(e) => setUsername(e.target.value)} />
            <span>Email address *</span>
            <input type='email' required onChange={(e) => setEmail(e.target.value)} />
            <span>Password *</span>
            <input type='password' required onChange={(e) => setPassword(e.target.value)} />
            <button type='submit' className='button'>
              Register
            </button>
          </form>
          {error && <span className="something-w-w">Someting went wrong</span>}
        </div>
      </section>
    </>
  )
}
