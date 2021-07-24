import { FILE_LEFT_NAV_ITEMS } from "../utils/const"
import React from "react"

const LeftNavBar = function (props) {
    const leftNavItems = FILE_LEFT_NAV_ITEMS.map((item, index) => (
        <div className="left-nav-item" className={index === 0 ? 'left-nav-item-selected' : ''}>
            {/* <Link to={item.path}>{item.name}</Link> */}
        </div>
    ))
    return (
        <div className="left-nav-bar">
            {leftNavItems}
        </div>
    )
}

export default LeftNavBar;