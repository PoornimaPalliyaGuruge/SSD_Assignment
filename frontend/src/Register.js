import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  const [totalCredit, setTotalCredit] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      contact,
      status,
      totalcredit: totalCredit,
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
    <div>
      <header id="header" class="fixed-top">
        <div class="container d-flex align-items-center">
          <h1 class="logo me-auto">
            <a href="/">Register</a>
          </h1>
        </div>
      </header>

      <section id="hero2" class="d-flex align-items-center">
        <div class="container">
          <section id="contact" className="contact">
            <div className="container" data-aos="fade-up">
              <div className="section-title">
                <h1>Register</h1>
              </div>
              <div className="row">
                <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                  <form
                    onSubmit={handleSubmit}
                    method="post"
                    role="form"
                    className="php-email-form"
                  >
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact">Contact</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => setContact(e.target.value)}
                        value={contact}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="totalCredit">Total Credit</label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        onChange={(e) => setTotalCredit(e.target.value)}
                        value={totalCredit}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="userType">User Type</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => setUserType(e.target.value)}
                        value={userType}
                      />
                    </div>

                    <div className="text-center">
                      <button type="submit">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Register;
