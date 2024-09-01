import { Link, useLocation } from 'react-router-dom'
import { NavWrapper } from './style'
import dark from '../../assets/dark-mode.svg'
import white from '../../assets/white-mode.svg'
import { notify } from '../Toast'
import Logo from '../Logo'

function Navigation({ theme, setTheme, html }) {
  const location = useLocation()

  const themeToggle = () => {
    if (html.classList.contains('ui-white')) {
      html.classList.remove('ui-white')
      setTheme('dark')
      notify({ type: 'success', text: '다크모드가 저장되었습니다' })
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.add('ui-white')
      setTheme('white')
      notify({ type: 'success', text: '화이트모드가 저장되었습니다' })
      localStorage.setItem('theme', 'white')
    }
  }

  return (
    <NavWrapper>
      <nav className="header_nav">
        <Logo />
        <Link
          className={`header_nav_link ${
            location.pathname === '/' ? 'nav_bg_color' : ''
          }`}
          to="/"
        >
          홈
        </Link>
        <Link
          className={`header_nav_link ${
            location.pathname.startsWith('/detail') ? 'nav_bg_color' : ''
          }`}
          to="/detail"
        >
          영화
        </Link>
        <Link
          className={`header_nav_link ${
            location.pathname.startsWith('/search') ? 'nav_bg_color' : ''
          }`}
          to="/search"
        >
          검색
        </Link>
        <button onClick={themeToggle} className="header_theme_color">
          <img src={theme === 'dark' ? dark : white} alt="theme icon" />
        </button>
      </nav>
    </NavWrapper>
  )
}

export default Navigation
