import "./dashboard.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-container">
      
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="dashboard-content">
        <h3>Welcome 👋</h3>

        {user && (
          <div className="user-card">
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        <p>This is your dashboard page 🚀</p>
      </div>

    </div>
  );
}