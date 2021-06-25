import React, { useState } from "react"

import avatar from "../assets/images/user-avatar.jpg"
import user_icon from "../assets/images/user-icon.svg"
import calendar_icon from "../assets/images/calendar-icon-2.svg"
import bill_icon from "../assets/images/bill-icon.svg"
import logout_icon from "../assets/images/logout-icon.svg"

import "./UserInfo.css"

const UserInfo = (props) => {
  const { handleLogOutOfApp } = props 

  const [show, setShow] = useState(false)

  const toggleDropdown = () => {
    if (show) {
      return setShow(false)
    }
    setShow(true)
  }

  const handleLogout = (e) => {
    e.preventDefault()
    handleLogOutOfApp()
  }

  return (
    <div className="user-info">
      <div className="user-info__avatar" onClick={toggleDropdown}>
        <img src={avatar} alt="" />
      </div>
      <div className={ `user-info__dropdown ${show ? 'show': ''}` }>
        <a className="user-info__dropdown__item" href="/profile">
          <img src={user_icon} alt="" />
          <p>Profile</p>
        </a>
        <a className="user-info__dropdown__item" href="/booking">
          <img src={calendar_icon} alt="" />
          <p>My Booking</p>
        </a>
        <a className="user-info__dropdown__item" href="/history">
          <img src={bill_icon} alt="" />
          <p>History</p>
        </a>
        <hr />
        <a className="user-info__dropdown__item" href="/" onClick={handleLogout}>
          <img src={logout_icon} alt="" />
          <p>Logout</p>
        </a>
      </div>
    </div>
  )
}

export default UserInfo