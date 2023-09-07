import { Link, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Menu.css';

export default function Menu() {
  return (
    <>
    <nav className='navBar'>
      <ul className='ulStyle'>
        <div className='linkStyleIcon'>
          <div>
            <img className="mainImageBar" src={require('./imgs/icon.gif')}/>
          </div>
        </div>
        <div className='linkStyle'>
          <Button variant="text" size="large">
            <Link className='link' to="/">Home</Link>
          </Button>
        </div>
        <div className='linkStyle'>
          <Button  variant="text" size="large">
            <Link className='link' to="/compare">Compare</Link>
          </Button>
        </div>
      </ul>
    </nav>
    <Outlet />
  </>
  );
}
