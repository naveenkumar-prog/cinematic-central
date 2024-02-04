import './Header.css'

const Header = () => {
    return(
        <span className='header' onClick={()=>window.scroll(0,0)}>🎬 Cinematic Central 📽️</span>
    )
}

export default Header;