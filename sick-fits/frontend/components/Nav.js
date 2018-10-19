import Link from 'next/link';
import NavStyled from './styles/NavStyles';

const Nav = props => (
  <NavStyled>
    <Link href="/items">
      <a> items</a>
    </Link>
    <Link href="/sell">
      <a> sell</a>
    </Link>
    <Link href="/signup">
      <a> signup</a>
    </Link>
    <Link href="/orders">
      <a> orders</a>
    </Link>
    <Link href="/me">
      <a> Accounte</a>
    </Link>
  </NavStyled>
);

export default Nav;
