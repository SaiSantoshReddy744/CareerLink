import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [users, setUsers] = useState([])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("candidate")

  const fetchUsers = () => {
    fetch("http://127.0.0.1:8000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const createUser = (event) => {
    event.preventDefault()

    fetch("http://127.0.0.1:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role
      })
    })
      .then((response) => response.json())
      .then(() => {
        setName("")
        setEmail("")
        setPassword("")
        setRole("candidate")
        fetchUsers()
      })
      .catch((error) => console.error(error))
  }

  return (
    <div className="app">

      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          Career<span>Link</span>
        </div>

        <nav>
          <a href="#">Home</a>
          <a href="#">Find Jobs</a>
          <a href="#">Companies</a>
          <a href="#">For Employers</a>
        </nav>

        <div className="nav-actions">
          <button className="login-btn">Login</button>
          <button className="register-btn">Get Started</button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">

        <div className="hero-content">

          <div className="badge">
            🚀 Your career journey starts here
          </div>

          <h1>
            Find a job that
            <br />
            <span>fits your future.</span>
          </h1>

          <p>
            Discover opportunities, connect with companies,
            and take the next step in your career.
          </p>

          <div className="search-container">

            <div className="search-field">
              🔍
              <input
                type="text"
                placeholder="Job title, skills or keywords"
              />
            </div>

            <div className="search-field location">
              📍
              <input
                type="text"
                placeholder="Location"
              />
            </div>

            <button className="search-btn">
              Search Jobs
            </button>

          </div>

          <div className="popular">
            <span>Popular:</span>
            <button>Python</button>
            <button>Java</button>
            <button>Data Science</button>
            <button>AI / ML</button>
          </div>

        </div>

      </section>

      {/* Stats */}
      <section className="stats">

        <div>
          <strong>10K+</strong>
          <span>Jobs Available</span>
        </div>

        <div>
          <strong>5K+</strong>
          <span>Companies</span>
        </div>

        <div>
          <strong>25K+</strong>
          <span>Job Seekers</span>
        </div>

        <div>
          <strong>95%</strong>
          <span>Successful Matches</span>
        </div>

      </section>

      {/* Create User */}
      <section className="create-section">

        <div className="section-heading">
          <span>GET STARTED</span>
          <h2>Create your CareerLink account</h2>
          <p>
            Join CareerLink as a candidate or recruiter.
          </p>
        </div>

        <form onSubmit={createUser} className="user-form">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button type="submit">
            Create Account →
          </button>

        </form>

      </section>

      {/* Users */}
      <section className="users-section">

        <div className="section-heading">
          <span>CAREERLINK COMMUNITY</span>
          <h2>Registered Users</h2>
        </div>

        <div className="users-grid">

          {users.map((user) => (

            <div className="user-card" key={user.id}>

              <div className="avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="user-info">
                <h3>{user.name}</h3>

                <p>{user.email}</p>

                <span className={`role ${user.role}`}>
                  {user.role}
                </span>
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Footer */}
      <footer>
        <div className="logo">
          Career<span>Link</span>
        </div>

        <p>
          Connecting talent with opportunity.
        </p>

        <span>© 2026 CareerLink</span>
      </footer>

    </div>
  )
}

export default App