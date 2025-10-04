import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/authContext";
import axios from "axios";

const User = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  // Mock data for demonstration
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    walletBalance: 0,
    rewards: 150,
    orders: []
  });

  // Fetch user details when component loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
       
        setUserData(res.data.user);
        
        setUserProfile(prev => ({
          ...prev,
          name: res.data.user.name,
          email: res.data.user.email,
          phone: res.data.user.phoneNumber,
          address: res.data.user.address || "",
          walletBalance: res.data.user.walletBalance || 0
        }));
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/signout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaveStatus("saving");
      await axios.put(
        "http://localhost:5000/api/user/profile",
        userProfile,
        { withCredentials: true }
      );
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, newMessage]);
    setUserMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "Thank you for your message. Our support team will get back to you shortly. Is there anything else I can help you with?",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const mockOrders = [
    { id: 1, date: "2024-01-15", total: 45.99, status: "Delivered", items: 3 },
    { id: 2, date: "2024-01-10", total: 29.99, status: "Processing", items: 2 },
    { id: 3, date: "2024-01-05", total: 67.50, status: "Delivered", items: 4 }
  ];

  const mockAddresses = [
    { id: 1, type: "Home", address: "123 Main St, Apt 4B, New York, NY 10001", isDefault: true },
    { id: 2, type: "Work", address: "456 Business Ave, Floor 12, New York, NY 10002", isDefault: false }
  ];

  const renderProfileTab = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card bg-dark btn-outline-dark border-light">
          <div className="card-header border-secondary">
            <h5 className="card-title mb-0 text-white">
              <i className="bi bi-person-gear me-2 text-primary"></i>
              Personal Information
            </h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-light">Full Name</label>
                <input
                  type="text"
                  className="form-control bg-dark border-secondary text-white"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-light">Email</label>
                <input
                  type="email"
                  className="form-control bg-dark border-secondary text-white"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="col-12">
                <label className="form-label text-light">Phone Number</label>
                <input
                  type="tel"
                  className="form-control bg-dark border-secondary text-white"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card bg-dark border-secondary">
          <div className="card-header border-secondary">
            <h5 className="card-title mb-0 text-white">
              <i className="bi bi-wallet2 me-2 text-success"></i>
              Wallet & Rewards
            </h5>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center p-3 bg-gradient-primary rounded">
                  <i className="bi bi-wallet2 fs-2 text-white me-3"></i>
                  <div>
                    <h6 className="mb-1 text-light opacity-75">Wallet Balance</h6>
                    <h4 className="mb-0 text-white">${userProfile.walletBalance.toFixed(2)}</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center p-3 bg-gradient-warning rounded">
                  <i className="bi bi-award fs-2 text-white me-3"></i>
                  <div>
                    <h6 className="mb-1 text-light opacity-75">Reward Points</h6>
                    <h4 className="mb-0 text-white">{userProfile.rewards} pts</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="card bg-dark border-secondary">
      <div className="card-header border-secondary">
        <h5 className="card-title mb-0 text-white">
          <i className="bi bi-bag-check me-2 text-primary"></i>
          My Orders
        </h5>
      </div>
      <div className="card-body">
        {mockOrders.map(order => (
          <div key={order.id} className="border-bottom border-secondary pb-3 mb-3">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h6 className="text-white mb-1">Order #{order.id}</h6>
                <p className="text-muted mb-1">Placed on {order.date}</p>
                <p className="text-light mb-0">{order.items} items • ${order.total}</p>
              </div>
              <span className={`badge ${
                order.status === 'Delivered' ? 'bg-success' : 'bg-warning'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAddressesTab = () => (
    <div className="card bg-dark border-secondary">
      <div className="card-header border-secondary d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0 text-white">
          <i className="bi bi-geo-alt me-2 text-primary"></i>
          Saved Addresses
        </h5>
        <button className="btn btn-sm btn-primary">
          <i className="bi bi-plus me-1"></i>Add New
        </button>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {mockAddresses.map(address => (
            <div key={address.id} className="col-md-6">
              <div className={`p-3 rounded border ${
                address.isDefault ? 'border-primary' : 'border-secondary'
              }`}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="text-white mb-0">{address.type}</h6>
                  {address.isDefault && (
                    <span className="badge bg-primary">Default</span>
                  )}
                </div>
                <p className="text-light mb-2 small">{address.address}</p>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary">Edit</button>
                  {!address.isDefault && (
                    <button className="btn btn-sm btn-outline-secondary">Set Default</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRewardsTab = () => (
    <div className="card bg-dark border-secondary">
      <div className="card-header border-secondary">
        <h5 className="card-title mb-0 text-white">
          <i className="bi bi-award me-2 text-warning"></i>
          My Rewards
        </h5>
      </div>
      <div className="card-body">
        <div className="text-center mb-4">
          <div className="display-4 text-warning fw-bold">{userProfile.rewards}</div>
          <p className="text-light">Reward Points Available</p>
        </div>
        
        <div className="row g-3">
          <div className="col-md-4">
            <div className="text-center p-3 bg-dark rounded border border-secondary">
              <i className="bi bi-gift fs-1 text-primary mb-2"></i>
              <h6 className="text-white">500 Points</h6>
              <p className="text-muted small">$10 Voucher</p>
              <button className="btn btn-sm btn-outline-primary w-100">Redeem</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center p-3 bg-dark rounded border border-secondary">
              <i className="bi bi-cup-hot fs-1 text-primary mb-2"></i>
              <h6 className="text-white">1000 Points</h6>
              <p className="text-muted small">Free Coffee</p>
              <button className="btn btn-sm btn-outline-primary w-100" disabled>Redeem</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center p-3 bg-dark rounded border border-secondary">
              <i className="bi bi-truck fs-1 text-primary mb-2"></i>
              <h6 className="text-white">200 Points</h6>
              <p className="text-muted small">Free Delivery</p>
              <button className="btn btn-sm btn-outline-primary w-100">Redeem</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-auto" style={{paddingTop:"10%" , backgroundColor:"#000" }}>
      <div className="container py-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="card bg-black border-1 border-light shadow-lg sticky-top" style={{top: "100px"}}>
              <div className="card-body p-0">
                {/* User Summary */}
                <div className="p-4 bg-gradient-primary border-bottom border-secondary">
                  <div className="text-center">
                    <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{width: "80px", height: "80px"}}>
                      <i className="bi bi-person-fill text-white fs-3"></i>
                    </div>
                    <h5 className="text-white mb-1">{userProfile.name || "User"}</h5>
                    <p className="text-light opacity-75 mb-0">{userProfile.email}</p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="p-3">
                  {[
                    { id: "profile", icon: "person", label: "Profile" },
                    { id: "orders", icon: "bag-check", label: "My Orders" },
                    { id: "addresses", icon: "geo-alt", label: "Addresses" },
                    { id: "rewards", icon: "award", label: "Rewards" }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      className={`btn w-100 text-start d-flex align-items-center p-3 mb-2 rounded ${
                        activeTab === tab.id ? 'btn-light' : 'btn-outline-light'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <i className={`bi bi-${tab.icon} me-3`}></i>
                      {tab.label}
                    </button>
                  ))}
                  
                  <button 
                    className="btn btn-outline-danger w-100 d-flex align-items-center p-3 mt-3"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-3"></i>
                    Logout
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            {isLoading ? (
              <div className="card bg-dark border-secondary">
                <div className="card-body text-center py-5">
                  <div className="spinner-border text-primary mb-3" role="status"></div>
                  <p className="text-light">Loading your profile...</p>
                </div>
              </div>
            ) : (
              <>
                {activeTab === "profile" && renderProfileTab()}
                {activeTab === "orders" && renderOrdersTab()}
                {activeTab === "addresses" && renderAddressesTab()}
                {activeTab === "rewards" && renderRewardsTab()}

                {/* Save Button for Profile Tab */}
                {activeTab === "profile" && (
                  <div className="mt-4">
                    <button 
                      className="btn btn-primary px-4"
                      onClick={handleSaveProfile}
                      disabled={saveStatus === "saving"}
                    >
                      {saveStatus === "saving" ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-lg me-2"></i>
                          Save Changes
                        </>
                      )}
                    </button>
                    
                    {saveStatus === "success" && (
                      <div className="alert alert-success mt-3 d-flex align-items-center">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Profile updated successfully
                      </div>
                    )}
                    
                    {saveStatus === "error" && (
                      <div className="alert alert-danger mt-3 d-flex align-items-center">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        Failed to update profile
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Help Chatbot */}
      <div className={`position-fixed bottom-0 end-0 m-4 ${chatbotOpen ? 'd-block' : 'd-none'}`} 
           style={{zIndex: 1050, width: "350px"}}>
        <div className="card bg-black border-primary shadow-lg">
          <div className="card-header bg-primary d-flex justify-content-between align-items-center">
            <h6 className="mb-0 text-white">
              <i className="bi bi-robot me-2"></i>
              Support Assistant
            </h6>
            <button 
              className="btn btn-sm btn-light"
              onClick={() => setChatbotOpen(false)}
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
          <div className="card-body p-3" style={{maxHeight: "300px", overflowY: "auto"}}>
            {chatMessages.map(message => (
              <div key={message.id} className={`d-flex mb-3 ${
                message.sender === "user" ? "justify-content-end" : "justify-content-start"
              }`}>
                <div className={`p-3 rounded ${
                  message.sender === "user" 
                    ? "bg-primary text-white" 
                    : "bg-secondary text-light"
                }`} style={{maxWidth: "80%"}}>
                  <p className="mb-1">{message.text}</p>
                  <small className="opacity-75">{message.timestamp}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="card-footer border-secondary">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-dark border-secondary text-white"
                placeholder="Type your message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                className="btn btn-primary"
                onClick={handleSendMessage}
              >
                <i className="bi bi-send"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Toggle Button */}
      <button 
        className="btn btn-primary position-fixed rounded-circle d-flex align-items-center justify-content-center"
        style={{width: "60px", height: "60px", bottom: "20px", right: "20px", zIndex: 1040}}
        onClick={() => setChatbotOpen(!chatbotOpen)}
      >
        <i className="bi bi-robot fs-5"></i>
      </button>
    </div>
  );
};

export default User;