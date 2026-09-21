import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function EmployeeList() {

    const [employee, setEmployee] = useState([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3 ;

    const [value] = useTypewriter({
        words: ['Details', 'List', 'Info'],
        loop: true,
        typeSpeed: 120,
        deleteSpeed: 80
    });

    // Load employees
    const loadEmployees = () => {
        EmployeeService.getAllEmployees()
            .then(res => {
                setEmployee(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    // -----------------------------
    // Pagination Logic
    // -----------------------------

    const indexOfLastEmployee = currentPage * recordsPerPage;

    const indexOfFirstEmployee =
        indexOfLastEmployee - recordsPerPage;

    const currentEmployees = employee.slice(
        indexOfFirstEmployee,
        indexOfLastEmployee
    );

    const totalPages = Math.ceil(
        employee.length / recordsPerPage
    );

    // -----------------------------
    // Delete Employee
    // -----------------------------

    const deleteEmployee = (id) => {

        EmployeeService.deleteEmployee(id)
            .then(() => {
                loadEmployees();
            })
            .catch(error => {
                console.log(error);
            });
    };

    // -----------------------------
    // Previous Page
    // -----------------------------

    const previousPage = () => {

        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // -----------------------------
    // Next Page
    // -----------------------------

    const nextPage = () => {

        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // -----------------------------
    // Go To Page
    // -----------------------------

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mt-5 p-5">

            <h4 className="text-center">
                Employee {value} <Cursor />
            </h4>

            <div className="row mt-5">

                <Link
                    to="/add-emp"
                    className="btn btn-dark mb-3"
                    style={{ width: '237px' }}
                >
                    Add Employee
                </Link>

                <table className="table table-bordered table-striped">

                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>DOJ</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {currentEmployees.length > 0 ? (

                            currentEmployees.map(emp => (

                                <tr key={emp.id}>

                                    <td>{emp.id}</td>

                                    <td>{emp.name}</td>

                                    <td>{emp.doj}</td>

                                    <td>{emp.dept.deptName}</td>

                                    <td>{emp.dept.designation}</td>

                                    <td>

                                        <Link
                                            to={`/update-emp/${emp.id}`}
                                            className="btn btn-warning"
                                        >
                                            update
                                        </Link>

                                        <button
                                            className="btn btn-danger ms-3"
                                            onClick={() =>
                                                deleteEmployee(emp.id)
                                            }
                                        >
                                            delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center"
                                >
                                    No employees found
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

                {/* ----------------------------- */}
                {/* Pagination Buttons */}
                {/* ----------------------------- */}

                {totalPages > 0 && (

                    <div className="d-flex justify-content-center mt-3">

                        {/* Previous */}

                        <button
                            className="btn btn-light me-2"
                            onClick={previousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        {/* Page Numbers */}

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map(pageNumber => (

                            <button
                                key={pageNumber}
                                className={
                                    currentPage === pageNumber
                                        ? "btn btn-primary me-1"
                                        : "btn btn-outline-primary me-1"
                                }
                                onClick={() =>
                                    goToPage(pageNumber)
                                }
                            >
                                {pageNumber}
                            </button>

                        ))}

                        {/* Next */}

                        <button
                            className="btn btn-light ms-2"
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>

                    </div>

                )}

                {/* ----------------------------- */}
                {/* Pagination Information */}
                {/* ----------------------------- */}

                <div className="text-center mt-3 text-light fw-bold">

                    Showing{' '}

                    {employee.length === 0
                        ? 0
                        : indexOfFirstEmployee + 1
                    }

                    {' - '}

                    {Math.min(
                        indexOfLastEmployee,
                        employee.length
                    )}

                    {' of '}

                    {employee.length}

                    {' employees'}

                </div>

            </div>

        </div>
    );
}

export default EmployeeList;