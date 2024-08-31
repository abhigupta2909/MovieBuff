import './header.css';

const Header = () => {
    return (
        <span onClick={() => window.scroll(0, 0)} className='header'>Movie Buff</span>
    )
}

export default Header;