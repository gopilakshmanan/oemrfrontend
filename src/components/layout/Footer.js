import React from 'react'

const Footer = () => {
    return (
        <footer className="d-flex justify-content-center container-fluid border-top border-secondary mt-3">
            <p>&copy; {new Date().getFullYear()} Vel Micro Works Incorporated. All Rights Reserved.</p>
        </footer>
    )
}

export default Footer