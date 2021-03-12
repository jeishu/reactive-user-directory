import React, {useState, useEffect} from 'react';
import API from "../../utils/API.js";
import EmployeeContext from "../../utils/EmployeeContext.js";
// import Card from "../Card/Card.js";
import Navbar from "../Navbar/Navbar.js";
import Search from "../Search/Search.js"
import Menu from "../Menu/Menu.js";
import DataTable from "../DataTable/DataTable.js";

const EmployeeData = () => {
    // const [results, setResults] = useState([]);

    const [employeeState, setEmployeeState] = useState({
        list: [],
        filterList: [],
        profile: [
            {label: "Image"},
            {label: "Name"},
            {label: "Phone"},
            {label: "Email"}
        ]
    })

    // Render 25 People
    useEffect(() => {
        API.getEmployee().then(res => {

            setEmployeeState({
                ...employeeState,
                list: res.data.results,
                filterList: res.data.results
            })
        })
    }, []);

    const handleSearch = (event) => { 
        setEmployeeState({
            ...employeeState,
            filterList: employeeState.list.filter(users => {
                let input = users.name.first.toLowerCase();
                return input.indexOf(event.target.value.toLowerCase()) !== -1;
            })
        })
    }

    return (
        <EmployeeContext.Provider value={{employeeState, handleSearch}}>
            <div>
                <Navbar>
                    <Search/>
                    <Menu/>
                </Navbar>
                <div>
                    {employeeState.filterList.length > 0 ? <DataTable /> : <div></div>}
                </div>

                {/* {results.map ( employee => {
                    return (<Card
                    image={employee.picture.large}
                    name={`${employee.name.first} ${employee.name.last}`}
                    phone={employee.phone}
                    email={employee.email}
                    />)
                })}     */}
            </div>
        </EmployeeContext.Provider>
    );
};

export default EmployeeData;
