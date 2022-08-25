import { useEffect } from "react"
import Config from '../config/Config.json'

const Favicon = (props) => {
    useEffect(() => {
        let link = document.querySelector("link[rel~='icon']")
        if (!link) {
            link = document.createElement('link')
            link.rel = 'icon'
            document.getElementsByTagName('head')[0].appendChild(link)
        }
        link.href = process.env.PUBLIC_URL + Config.favicon
    }, [])

    return (
        <></>
    )
}

export default Favicon