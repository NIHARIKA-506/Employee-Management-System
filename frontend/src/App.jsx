import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Footer from './components/Footer.jsx';
import EmployeeList from './components/EmployeeList.jsx';
import CreateEmployee from './components/CreateEmployee.jsx';
import UpdateEmployee from './components/UpdateEmployee.jsx';

function PrivateRouter({ children }) {
    return localStorage.getItem("logged")
        ? children
        : <Navigate to="/login" />;
}

function App() {
    return (
        <div className='bg-color'>
            <BrowserRouter>

                <Header />

                <Routes>

                    <Route
                        path='/login'
                        element={<Login />}
                    />

                    {/* Protected pages */}

                    <Route
                        path='/'
                        element={
                            <PrivateRouter>
                                <EmployeeList />
                            </PrivateRouter>
                        }
                    />

                    <Route
                        path='/add-emp'
                        element={
                            <PrivateRouter>
                                <CreateEmployee />
                            </PrivateRouter>
                        }
                    />

                    <Route
                        path='/update-emp/:id'
                        element={
                            <PrivateRouter>
                                <UpdateEmployee />
                            </PrivateRouter>
                        }
                    />

                </Routes>

                <Footer />

            </BrowserRouter>
        </div>
    );
}

export default App;