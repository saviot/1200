import logo from '../images/logo.svg';

function Header() {
  return (
    <header className='page__header'>
      <img src={logo} alt='logo' />
    </header>
  );
}

export default Header;
