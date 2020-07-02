import React from 'react'

import Color from '../constants/colors'

const Footer = () => {
    return (
        <div style = {{background: Color.primary, textAlign : "center"}}>
            <p style={{color: "#FFF", padding : "20px", fontWeight : "bold", marginBottom:0}}>All Right Reserved</p>
        </div>
    )
}

export default Footer
