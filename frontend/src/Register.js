// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { isEmail } from "validator";
//
// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [contact, setContact] = useState("");
//   const [userType, setUserType] = useState("Passenger");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//
//     if (!isEmail(email)) {
//       setError("Invalid email format");
//       return;
//     }
//     if (password.length < 8) {
//       setError("Password must be at least 8 characters long");
//       return;
//     }
//     if (!/^\d+$/.test(contact)) {
//       setError("Contact must be numeric");
//       return;
//     }
//
//     setError("");
//
//     const userData = {
//       email: email.trim(),
//       password: password.trim(),
//       contact: contact.trim(),
//       status: "no status",
//       totalcredit: 0,
//       userType,
//     };
//
//     try {
//       const response = await fetch("http://localhost:8080/api/user/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });
//
//       if (response.ok) {
//         console.log("User registered successfully");
//         navigate("/login");
//       } else {
//         console.error("Registration failed");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//
//   return (
//     <div
//       style={{
//         backgroundColor: "#37517E",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div className="container">
//         <div
//           style={{
//             width: "600px",
//             margin: "0 auto",
//             backgroundColor: "#fff",
//             padding: "20px",
//             borderRadius: "8px",
//             boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <h1 style={{ color: "#000", textAlign: "center" }}>Register</h1>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group mb-3">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 placeholder="email"
//                 className="form-control"
//                 required
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//               />
//             </div>
//
//             <div className="form-group mb-3">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 placeholder="password"
//                 className="form-control"
//                 required
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//               />
//             </div>
//
//             <div className="form-group mb-3">
//               <label htmlFor="contact">Contact</label>
//               <input
//                 type="text"
//                 placeholder="contact"
//                 className="form-control"
//                 required
//                 onChange={(e) => setContact(e.target.value)}
//                 value={contact}
//               />
//             </div>
//
//             <div className="form-group mb-3">
//               <label htmlFor="userType">User Type</label>
//               <select
//                 className="form-control"
//                 required
//                 onChange={(e) => setUserType(e.target.value)}
//                 value={userType}
//               >
//                 <option value="Passenger">Passenger</option>
//               </select>
//             </div>
//
//             <div className="text-center">
//               <button type="submit" className="btn btn-primary">
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Register;



import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import DOMPurify from "dompurify"; // Import DOMPurify to sanitize inputs

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [userType, setUserType] = useState("Passenger");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState("");// CSRF token state

  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    // Fetch CSRF token
    axios.get(`${API_URL}/csrf-token`, { withCredentials: true })
      .then(response => {
        setCsrfToken(response.data.csrfToken);
      })
      .catch(error => console.error('Error fetching CSRF token:', error));
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (!/^\d+$/.test(contact)) {
      setError("Contact must be numeric");
      return;
    }

    setError("");
    // Sanitize inputs before sending
    const sanitizedEmail = DOMPurify.sanitize(email.trim());
    const sanitizedPassword = DOMPurify.sanitize(password.trim());
    const sanitizedContact = DOMPurify.sanitize(contact.trim());

    const userData = {
      email: sanitizedEmail,
      password: sanitizedPassword,
      contact: sanitizedContact,
      status: "no status",
      totalcredit: 0,
      userType,
    };

    try {
      const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,  // Include CSRF token in the header
        },
        body: JSON.stringify(userData),
        credentials: 'include', // Include cookies
      });

      if (response.ok) {
        console.log("User registered successfully");
        navigate("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <div
          style={{
            backgroundColor: "#37517E",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
      >
        <div className="container">
          <div
              style={{
                width: "600px",
                margin: "0 auto",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
          >
            <h1 style={{ color: "#000", textAlign: "center" }}>Register</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="email"
                    className="form-control"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="password"
                    className="form-control"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="contact">Contact</label>
                <input
                    type="text"
                    placeholder="contact"
                    className="form-control"
                    required
                    onChange={(e) => setContact(e.target.value)}
                    value={contact}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="userType">User Type</label>
                <select
                    className="form-control"
                    required
                    onChange={(e) => setUserType(e.target.value)}
                    value={userType}
                >
                  <option value="Passenger">Passenger</option>
                </select>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Register;
