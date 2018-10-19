import Link from 'next/link';

const Nav = props => (
  <div>
    <Link href="/sell">
      <a> sell!</a>
    </Link>
    <Link href="/index">
      <a> index</a>
    </Link>
  </div>
);

export default Nav;
