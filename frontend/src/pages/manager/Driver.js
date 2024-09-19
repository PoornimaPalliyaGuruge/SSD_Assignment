// import Header from "../../components/Header";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
//
//
// const Driver = () => {
//
//   const [drivers, setDrivers] = useState([]);
//   const [name, setName] = useState('');
//   const [contact, setContact] = useState('');
//   const [age, setAge] = useState('');
//   const [address, setAddress] = useState('');
//   const [licenceNo, setLicenceNo] = useState('');
//   const [selectedDriverId, setSelectedDriverId] = useState(null);
//
//
//
//   ///donwload schedule
//   const downloadSchedule = () => {
//     // Prepare the schedule data as a CSV or any other format
//     const scheduleCSV = drivers.map(item => (
//       `${item.name}, ${item.contact}, ${item.age}, ${item.address}, ${item.licenceNo}`
//     )).join('\n');
//
//     // Create a Blob containing the data and set the appropriate headers
//     const blob = new Blob([scheduleCSV], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'schedule.csv';
//     document.body.appendChild(a);
//
//     // Trigger the download
//     a.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   };
//
//
//
//   /************Update the code ************/
//   useEffect(() => {
//     // Fetch drivers data from your backend API
//     fetch('http://localhost:8080/api/drivers')
//       .then((response) => response.json())
//       .then((data) => setDrivers(data))
//       .catch((error) => console.error('Error fetching drivers:', error));
//   }, []);
//
//
//
//
//   /************Add New Driver ************/
//   const handleAddDriver = () => {
//     const newDriver = {
//       name,
//       contact,
//       age,
//       address,
//       licenceNo,
//     };
//
//     axios.post('http://localhost:8080/api/drivers', newDriver, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         if (response.status === 200) {
//
//           // Reset input fields
//           setName('');
//           setContact('');
//           setAge('');
//           setAddress('');
//           setLicenceNo('');
//           console.log(response);
//
//           // Refresh the drivers data after adding a new driver
//           axios.get('http://localhost:8080/api/drivers')
//             .then((response) => setDrivers(response.data))
//             .catch((error) => console.error('Error fetching drivers:', error));
//         } else {
//           console.error('Failed to add driver');
//         }
//       })
//       .catch((error) => console.error('Error adding driver:', error));
//   };
//
//
//
//
//
//   /*********************UPdating the Driver **********************/
//   const handleEditClick = (driverId) => {
//     setSelectedDriverId(driverId);
//
//     // Fetch driver details based on the driverId
//     fetch(`http://localhost:8080/api/drivers/${driverId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setName(data.name);
//         setAge(data.age);
//         setAddress(data.address);
//         setContact(data.contact);
//         setLicenceNo(data.licenceNo);
//       })
//       .catch((error) => console.error('Error fetching driver details:', error));
//   };
//
//   const handleUpdateDriver = (e) => {
//     e.preventDefault();
//
//     // Use selectedDriverId to identify the driver you want to update
//     const driverId = selectedDriverId;
//
//     // Prepare the updated driver data
//     const updatedDriver = {
//       name,
//       age,
//       address,
//       contact,
//       licenceNo,
//     };// Send the updated data to the server
//     fetch(`http://localhost:8080/api/drivers/${driverId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedDriver),
//     })
//       .then((response) => {
//         if (response.status === 200) {
//           // Reset form fields and close the modal
//           setName('');
//           setAge('');
//           setAddress('');
//           setContact('');
//           setLicenceNo('');
//           setSelectedDriverId(null);
//           // Refresh the drivers data after updating
//           axios.get('http://localhost:8080/api/drivers')
//             .then((response) => setDrivers(response.data))
//             .catch((error) => console.error('Error fetching drivers:', error));
//         } else {
//           console.error('Failed to update driver');
//         }
//       }).catch((error) => console.error('Error updating driver:', error));
//   };
//
//
//
//
//   /******************** Deleting the Driver  **********************/
//   const handleDeleteClick = (driverId) => {
//     setSelectedDriverId(driverId);
//   };
//   const handleDeleteDriver = () => {
//     if (selectedDriverId) {
//       // Send a request to delete the selected driver
//       fetch(`http://localhost:8080/api/drivers/${selectedDriverId}`, {
//         method: 'DELETE',
//       })
//         .then((response) => {
//           if (response.status === 200) {
//             // Reset the selectedDriverId
//             setSelectedDriverId(null);
//             // Refresh the drivers data after deleting
//             axios.get('http://localhost:8080/api/drivers')
//               .then((response) => setDrivers(response.data))
//               .catch((error) => console.error('Error fetching drivers:', error));
//           } else {
//             console.error('Failed to delete driver');
//           }
//         })
//         .catch((error) => console.error('Error deleting driver:', error));
//     }
//
//
//   };
//
//   return (
//     <>
//
//
//       <Header />
//       <div className="container-xl" style={{ marginTop: 200 }}>
//         <div className="title-text">
//           <h2>Drivers</h2>
//         </div>
//         <div className="table-responsive">
//           <div className="table-wrapper">
//             <div className="table-title">
//               <div className="row">
//                 <div className="col-sm-6">
//                   <h2>
//                     Manage <b>Drivers</b>
//                   </h2>
//                 </div>
//                 <div className="col-sm-6">
//                   <a
//                     href="#addEmployeeModal"
//                     className="btn btn-success"
//                     data-toggle="modal"
//                   >
//                     <i className="material-icons"></i>{" "}
//                     <span>Add New Driver</span>
//                   </a>
//                   <a
//                     href="#deleteEmployeeModal"
//                     className="btn btn-danger"
//                     data-toggle="modal"
//                   >
//                     <i className="material-icons"></i> <span>Delete</span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <table className="table table-striped table-hover">
//               <thead>
//                 <tr>
//                   <th>
//                     <span className="custom-checkbox">
//                       <input type="checkbox" id="selectAll" />
//                       <label htmlFor="selectAll" />
//                     </span>
//                   </th>
//                   <th>Name</th>
//                   <th>Contact</th>
//                   <th>Age</th>
//                   <th>Address</th>
//                   <th>Licence No</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {drivers.map((driver) => (
//                   <tr key={driver.id}>
//                     <td>
//                       <span className="custom-checkbox">
//                         <input
//                           type="checkbox"
//                           id="checkbox1"
//                           name="options[]"
//                           defaultValue={1}
//                         />
//                         <label htmlFor="checkbox1" />
//                       </span>
//                     </td>
//                     <td>{driver.name}</td>
//                     <td>{driver.contact}</td>
//                     <td>{driver.age}</td>
//                     <td>{driver.address}</td>
//                     <td>{driver.licenceNo}</td>
//
//                     <td>
//                       <a
//                         href="#editEmployeeModal"
//                         className="edit"
//                         data-toggle="modal"
//                         data-id={driver.id}
//                         onClick={() => handleEditClick(driver.id)}
//                       >
//                         <i
//                           className="material-icons"
//                           data-toggle="tooltip"
//                           title="Edit"
//                           data-id={driver.id}
//                         >
//                           
//                         </i>
//
//                       </a>
//                       <a
//                         href="#deleteEmployeeModal"
//                         className="delete"
//                         data-toggle="modal"
//                         onClick={() => handleDeleteClick(driver.id)}
//                       >
//                         <i
//                           className="material-icons"
//                           data-toggle="tooltip"
//                           title="Delete"
//                         >
//                           
//                         </i>
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//
//
//
//               </tbody>
//             </table>
//             <div className="primary-btn text-center">
//               <a onClick={downloadSchedule} className="btn btn-primary" style={{ color: "white" }}>
//                 Download CSV
//               </a>
//             </div>
//
//
//
//           </div>
//         </div>
//       </div>
//       {/* ADD Modal HTML */}
//       <div id="addEmployeeModal" className="modal fade">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <form onSubmit={handleAddDriver}>
//               <div className="modal-header">
//                 <h4 className="modal-title">Add Driver</h4>
//                 <button
//                   type="button"
//                   className="close"
//                   data-dismiss="modal"
//                   aria-hidden="true"
//
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <div className="form-group">
//                   <label>Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     required="true"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)} />
//                 </div>
//                 <div className="form-group">
//                   <label>Age</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     required="true"
//                     value={age}
//                     onChange={(e) => setAge(e.target.value)} />
//                 </div>
//                 <div className="form-group">
//                   <label>Address</label>
//                   <textarea
//                     className="form-control"
//                     required="true"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Phone</label>
//                   <input type="text" className="form-control" required="true"
//                     value={contact}
//                     onChange={(e) => setContact(e.target.value)} />
//                 </div>
//                 <div className="form-group">
//                   <label>Licence No</label>
//                   <input type="text" className="form-control" required="true" value={licenceNo}
//                     onChange={(e) => setLicenceNo(e.target.value)} />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <input
//                   type="button"
//                   className="btn btn-default"
//                   data-dismiss="modal"
//                   defaultValue="Cancel"
//                 />
//                 <input
//                   type="submit"
//                   className="btn btn-success"
//                   defaultValue="Add"
//
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       {/* Edit Modal HTML */}
//       <div id="editEmployeeModal" className="modal fade">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <form onSubmit={handleUpdateDriver}>
//               <div className="modal-header">
//                 <h4 className="modal-title">Edit Driver</h4>
//                 <button
//                   type="button"
//                   className="close"
//                   data-dismiss="modal"
//                   aria-hidden="true"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <div className="form-group">
//                   <label>Name</label>
//                   <input type="text" className="form-control" required="true" value={name} onChange={(e) => setName(e.target.value)} />
//                 </div>
//                 <div className="form-group">
//                   <label>Age</label>
//                   <input type="number" className="form-control" required="true" value={age}
//                     onChange={(e) => setAge(e.target.value)} />
//                 </div>
//                 <div className="form-group">
//                   <label>Address</label>
//                   <textarea
//                     className="form-control"
//                     required="true"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Phone</label>
//                   <input type="text" className="form-control" required="true" value={contact}
//                     onChange={(e) => setContact(e.target.value)} />
//                 </div>
//                 <div className="form-group">
//                   <label>Licence No</label>
//                   <input type="text" className="form-control" required="true" value={licenceNo}
//                     onChange={(e) => setLicenceNo(e.target.value)} />
//                 </div>
//               </div>
//
//               <div className="modal-footer">
//                 <input
//                   type="button"
//                   className="btn btn-default"
//                   data-dismiss="modal"
//                   defaultValue="Cancel"
//                 />
//                 <input type="submit" className="btn btn-info" defaultValue="Save" />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       {/* Delete Modal HTML */}
//       <div id="deleteEmployeeModal" className="modal fade">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <form>
//               <div className="modal-header">
//                 <h4 className="modal-title">Delete Driver</h4>
//                 <button
//                   type="button"
//                   className="close"
//                   data-dismiss="modal"
//                   aria-hidden="true"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to delete these Records?</p>
//                 <p className="text-warning">
//                   <small>This action cannot be undone.</small>
//                 </p>
//               </div>
//               <div className="modal-footer">
//                 <input
//                   type="button"
//                   className="btn btn-default"
//                   data-dismiss="modal"
//                   defaultValue="Cancel"
//                 />
//                 <input
//                   type="submit"
//                   className="btn btn-danger"
//                   defaultValue="Delete"
//                   onClick={handleDeleteDriver}
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//
//     </>
//
//
//
//   );
// }
//
// export default Driver;


import Header from "../../components/Header";
import { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';  // Import DOMPurify for sanitization

const API_URL = process.env.REACT_APP_API_URL;

const Driver = () => {
    const [drivers, setDrivers] = useState([]);
    const [csrfToken, setCsrfToken] = useState('');// CSRF token state
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [licenceNo, setLicenceNo] = useState('');
    const [selectedDriverId, setSelectedDriverId] = useState(null);
    const sanitizedAddress = DOMPurify.sanitize(address);


    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch CSRF token
                const csrfResponse = await axios.get(`${API_URL}/csrf-token`, { withCredentials: true });
                setCsrfToken(csrfResponse.data.csrfToken);
                console.log('CSRF Token fetched:', csrfResponse.data.csrfToken);  // Check if token is fetched
    
                // Fetch drivers data and sanitize it
                const driversResponse = await axios.get(`${API_URL}/drivers`, { withCredentials: true });
                const sanitizedDrivers = driversResponse.data.map(driver => ({
                    ...driver,
                    name: DOMPurify.sanitize(driver.name),  // Sanitize dynamic data
                    contact: DOMPurify.sanitize(driver.contact),
                    address: DOMPurify.sanitize(driver.address),
                    licenceNo: DOMPurify.sanitize(driver.licenceNo),
                }));
                setDrivers(sanitizedDrivers);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };
    
        fetchInitialData();
    }, []);
    

    const fetchDrivers = async () => {
        try {
            const response = await axios.get(`${API_URL}/drivers`, { withCredentials: true });
            const sanitizedDrivers = response.data.map(driver => ({
                ...driver,
                name: DOMPurify.sanitize(driver.name),
                contact: DOMPurify.sanitize(driver.contact),
                address: DOMPurify.sanitize(driver.address),
                licenceNo: DOMPurify.sanitize(driver.licenceNo),
            }));
            setDrivers(sanitizedDrivers);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };
    const downloadSchedule = () => {
        const scheduleCSV = drivers.map(item => (
            `${item.name}, ${item.contact}, ${item.age}, ${item.address}, ${item.licenceNo}`
        )).join('\n');

        const blob = new Blob([scheduleCSV], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'schedule.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleAddDriver = async (e) => {
        e.preventDefault();
        console.log('handleAddDriver called');

         // Sanitize user input before sending
         const newDriver = {
            name: DOMPurify.sanitize(name),
            contact: DOMPurify.sanitize(contact),
            age: DOMPurify.sanitize(age),
            address: DOMPurify.sanitize(address),
            licenceNo: DOMPurify.sanitize(licenceNo)
        };
        
        console.log('CSRF Token before POST request:', csrfToken);  // Log the token
    
        try {
            const response = await axios.post(`${API_URL}/drivers`, newDriver, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,  // Pass CSRF token here
                }, withCredentials: true, 
            });
            
            console.log('Response received:', response);
            if (response.status === 200) {
                resetForm();
                fetchDrivers();
                console.log('Success: Driver added');
            } else {
                console.error('Failed to add driver');
            }
        } catch (error) {
            console.error('Error adding driver:', error.response ? error.response.data : error.message);
        }
    };
    
    
    

    const handleEditClick = async (driverId) => {
        setSelectedDriverId(driverId);
        try {
            const response = await axios.get(`${API_URL}/drivers/${driverId}`);
            const data = response.data;

            // Sanitize the response data before updating the state
            setName(DOMPurify.sanitize(data.name));
            setAge(DOMPurify.sanitize(data.age));
            setAddress(DOMPurify.sanitize(data.address));
            setContact(DOMPurify.sanitize(data.contact));
            setLicenceNo(DOMPurify.sanitize(data.licenceNo));

        } catch (error) {
            console.error('Error fetching driver details:', error);
        }
    };

    const handleUpdateDriver = async (e) => {
        e.preventDefault();  // Prevent form submission from reloading the page
        if (!selectedDriverId) return;
    
        const updatedDriver = {
            name: DOMPurify.sanitize(name),
            age: DOMPurify.sanitize(age),
            address: DOMPurify.sanitize(address),
            contact: DOMPurify.sanitize(contact),
            licenceNo: DOMPurify.sanitize(licenceNo),
        };
    
        try {
            const response = await axios.put(`${API_URL}/drivers/${selectedDriverId}`, updatedDriver, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,  // Pass the CSRF token
                },withCredentials: true,
            });
            
    
            if (response.status === 200) {
                resetForm();
                fetchDrivers();
            } else {
                console.error('Failed to update driver');
            }
        } catch (error) {
            console.error('Error updating driver:', error);
        }
    };
    

    const handleDeleteClick = (driverId) => {
        setSelectedDriverId(driverId);
    };

    const handleDeleteDriver = async () => {
        if (!selectedDriverId) return;
    
        try {
            const response = await axios.delete(`${API_URL}/drivers/${selectedDriverId}`, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,  // Pass the CSRF token
                },withCredentials: true,
            });
    
            if (response.status === 200) {
                setSelectedDriverId(null);
                fetchDrivers();
            } else {
                console.error('Failed to delete driver');
            }
        } catch (error) {
            console.error('Error deleting driver:', error);
        }
    };
    

    const resetForm = () => {
        setName('');
        setContact('');
        setAge('');
        setAddress('');
        setLicenceNo('');
        setSelectedDriverId(null);
    };
      // Render the sanitized address using dangerouslySetInnerHTML
      const renderAddress = (sanitizedAddress) => {
        return <div dangerouslySetInnerHTML={{ __html: sanitizedAddress }} />;
    };

    return (
        <>
            <Header />
            <div className="container-xl" style={{ marginTop: 200 }}>
                <div className="title-text">
                    <h2>Drivers</h2>
                </div>
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>
                                        Manage <b>Drivers</b>
                                    </h2>
                                </div>
                                <div className="col-sm-6">
                                    <a
                                        href="#addEmployeeModal"
                                        className="btn btn-success"
                                        data-toggle="modal"
                                    >
                                        <i className="material-icons"></i>{" "}
                                        <span>Add New Driver</span>
                                    </a>
                                    <a
                                        href="#deleteEmployeeModal"
                                        className="btn btn-danger"
                                        data-toggle="modal"
                                    >
                                        <i className="material-icons"></i> <span>Delete</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>
                    <span className="custom-checkbox">
                      <input type="checkbox" id="selectAll" />
                      <label htmlFor="selectAll" />
                    </span>
                                </th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Age</th>
                                <th>Address</th>
                                <th>Licence No</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {drivers.map(driver => (
                                <tr key={driver.id}>
                                    <td>
                      <span className="custom-checkbox">
                        <input
                            type="checkbox"
                            id="checkbox1"
                            name="options[]"
                            defaultValue={1}
                        />
                        <label htmlFor="checkbox1" />
                      </span>
                                    </td>
                                    <td>{driver.name}</td>
                                    <td>{driver.contact}</td>
                                    <td>{driver.age}</td>
                                    <td>{driver.address}</td>
                                    <td>{driver.licenceNo}</td>
                                    <td>
                                        <a
                                            href="#editEmployeeModal"
                                            className="edit"
                                            data-toggle="modal"
                                            data-id={driver.id}
                                            onClick={() => handleEditClick(driver.id)}
                                        >
                                            <i
                                                className="material-icons"
                                                data-toggle="tooltip"
                                                title="Edit"
                                                data-id={driver.id}
                                            >
                                                
                                            </i>
                                        </a>
                                        <a
                                            href="#deleteEmployeeModal"
                                            className="delete"
                                            data-toggle="modal"
                                            onClick={() => handleDeleteClick(driver.id)}
                                        >
                                            <i
                                                className="material-icons"
                                                data-toggle="tooltip"
                                                title="Delete"
                                            >
                                                
                                            </i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="primary-btn text-center">
                            <a onClick={downloadSchedule} className="btn btn-primary" style={{ color: "white" }}>
                                Download CSV
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* ADD Modal HTML */}
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <form onSubmit={handleAddDriver}>  {/* Change onClick to onSubmit */}
    <div className="modal-header">
        <h4 className="modal-title">Add Driver</h4>
        <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-hidden="true"
        >
            ×
        </button>
    </div>
    <div className="modal-body">
        <div className="form-group">
            <label>Name</label>
            <input
                type="text"
                className="form-control"
                required
                value={name}
                onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
            <label>Age</label>
            <input
                type="number"
                className="form-control"
                required
                value={age}
                onChange={e => setAge(e.target.value)} />
        </div>
        <div className="form-group">
            <label>Address</label>
            <textarea
                className="form-control"
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Phone</label>
            <input
                type="text"
                className="form-control"
                required
                value={contact}
                onChange={e => setContact(e.target.value)} />
        </div>
        <div className="form-group">
            <label>Licence No</label>
            <input
                type="text"
                className="form-control"
                required
                value={licenceNo}
                onChange={e => setLicenceNo(e.target.value)} />
        </div>
    </div>
    <div className="modal-footer">
        <input
            type="button"
            className="btn btn-default"
            data-dismiss="modal"
            value="Cancel"
        />
        <input
            type="submit"
            className="btn btn-success"
            value="Add"
        />
    </div>
</form>

                    </div>
                </div>
            </div>
            {/* Edit Modal HTML */}
            <div id="editEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleUpdateDriver}>
                            <div className="modal-header">
                                <h4 className="modal-title">Edit Driver</h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-hidden="true"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" required value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Age</label>
                                    <input type="number" className="form-control" required value={age}
                                           onChange={e => setAge(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea
                                        className="form-control"
                                        required
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" className="form-control" required value={contact}
                                           onChange={e => setContact(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Licence No</label>
                                    <input type="text" className="form-control" required value={licenceNo}
                                           onChange={e => setLicenceNo(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input
                                    type="button"
                                    className="btn btn-default"
                                    data-dismiss="modal"
                                    value="Cancel"
                                />
                                <input type="submit" className="btn btn-info" value="Save" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Delete Modal HTML */}
            <div id="deleteEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h4 className="modal-title">Delete Driver</h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-hidden="true"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete these Records?</p>
                                <p className="text-warning">
                                    <small>This action cannot be undone.</small>
                                </p>
                            </div>
                            <div className="modal-footer">
                                <input
                                    type="button"
                                    className="btn btn-default"
                                    data-dismiss="modal"
                                    value="Cancel"
                                />
                                <input
                                    type="submit"
                                    className="btn btn-danger"
                                    value="Delete"
                                    onClick={handleDeleteDriver}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Driver;
