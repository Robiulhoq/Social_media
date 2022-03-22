import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../App';

const TopMenu = () => {
    const [login, setLogin] = useContext(LoginContext);
    return (
        <div className="top_menu">
               <Link to='/'> <h2>SOCIAL <span className='spacial_logo'>MEDIA</span></h2></Link>
                <p>{login.email}</p>
            </div>
    );
};

export default TopMenu;