import {useNavigate} from 'react-router-dom';
import '../App.css';

function Header()
{
    const navigate = useNavigate();

    const handleLogout = (e)=>{
        e.preventDefault();
        localStorage.removeItem("logged");
        navigate('/login')
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <a href="" className="BridgeSoft"> BridgeSoft </a>
                {
                    localStorage.getItem("logged")  &&
                    <button className="btn btn-primary" onClick={handleLogout}> logout </button>
                }
            </div>
        </nav>
    )
}
export default Header;