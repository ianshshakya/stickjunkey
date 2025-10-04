import React, { useEffect, useState } from "react";
import AddItemForm from "./AddItem";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/dashboard", {
          method: "GET",
          credentials: "include"
        });

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setStats(data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Loading spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!stats) return <p className="text-center text-danger mt-5">Failed to load dashboard data.</p>;

  // Status badge color mapping
  const statusColors = {
    pending: "warning",
    completed: "success",
    processing: "info",
    cancelled: "danger",
    shipped: "primary"
  };
  const styles={
    categ: {
            fontFamily: ' "Boldonse", system- ui',
            fontWeight: "400",
            fontStyle: "normal",
            paddingTop:"100px"
        }
  }

  return (
    <div className="container-fluid py-4 mt-5 pt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={styles.categ} className="h2 fw-bold text-gradient">
          Dashboard Overview
        </h1>
        <div className="text-muted">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-5">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2" style={{
            borderLeft: "4px solid #4e73df",
            transition: "transform 0.2s ease-in-out"
          }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Orders
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {stats.totalOrders}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-shopping-cart fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2" style={{
            borderLeft: "4px solid #1cc88a",
            transition: "transform 0.2s ease-in-out"
          }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Total Revenue
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    ₹{stats.totalRevenue?.toLocaleString()}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-rupee-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2" style={{
            borderLeft: "4px solid #36b9cc",
            transition: "transform 0.2s ease-in-out"
          }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Total Users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {stats.totalUsers}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2" style={{
            borderLeft: "4px solid #f6c23e",
            transition: "transform 0.2s ease-in-out"
          }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Total Items
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {stats.totalItems}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-boxes fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Orders by Status */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow">
            <div className="card-header py-3" style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none"
            }}>
              <h6 className="m-0 font-weight-bold text-white">
                📊 Orders by Status
              </h6>
            </div>
            <div className="card-body">
              <div className="chart-pie pt-4 pb-2">
                <div className="list-group list-group-flush">
                  {stats.ordersByStatus?.map((status) => (
                    <div key={status._id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <span className="text-capitalize">
                        <span className={`badge bg-${statusColors[status._id] || 'secondary'} me-2`}>
                          ●
                        </span>
                        {status._id}
                      </span>
                      <span className="badge bg-primary rounded-pill">
                        {status.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow">
            <div className="card-header py-3" style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              border: "none"
            }}>
              <h6 className="m-0 font-weight-bold text-white">
                📦 Recent Orders
              </h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-borderless table-hover">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders?.map((order) => (
                      <tr key={order._id} style={{ cursor: "pointer" }}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="ms-3">
                              <p className="fw-bold mb-0">{order.user?.name || "N/A"}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge bg-${statusColors[order.status] || 'secondary'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="fw-bold">
                          ₹{order.totalAmount}
                        </td>
                        <td>
                          <small className="text-muted">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Form */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header" style={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              border: "none"
            }}>
              <h6 className="m-0 font-weight-bold text-white">
                ➕ Add New Item
              </h6>
            </div>
            <div className="card-body">
              <AddItemForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;