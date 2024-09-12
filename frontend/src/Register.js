import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [userType, setUserType] = useState("Passenger");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Automatically set status and totalcredit
    const userData = {
      email,
      password,
      contact,
      status: "no status", // Default status
      totalcredit: 0, // Default total credit
      userType,
    };

    try {
      const response = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
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
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h1 style={{ color: "#fff", textAlign: "center" }}>Register</h1>
            </div>
            <div className="row">
              <div className="col-lg-8 mt-5 mt-lg-0 d-flex align-items-stretch mx-auto">
                <form
                  onSubmit={handleSubmit}
                  style={{
                    width: "600px", // Increased width
                    margin: "0 auto",
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
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
                      <option value="Driver">Driver</option>
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
        </section>
      </div>
    </div>
  );
};

export default Register;
