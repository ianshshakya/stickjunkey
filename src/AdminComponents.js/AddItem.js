import React, { useState } from "react";

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    stockQuantity: "",
    price: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Basic validation
    if (!formData.name || !formData.category || !formData.price || !formData.stockQuantity) {
      setMessage("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/items/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
          credentials:"include"
        ,
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stockQuantity: Number(formData.stockQuantity),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to add item.");
      } else {
        setMessage("✅ " + data.message);
        setFormData({
          name: "",
          description: "",
          category: "",
          stockQuantity: "",
          price: "",
          imageUrl: "",
        });
        setShowPreview(false);
      }
    } catch (error) {
      setMessage("❌ Server error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Category options with icons
  const categories = [
    { value: "football", label: "⚽ Football", color: "success" },
    { value: "cricket", label: "🏏 Cricket", color: "warning" },
    { value: "marvel", label: "🦸 Marvel", color: "danger" },
    { value: "dcmovies", label: "🦇 DC Movies", color: "primary" },
    { value: "memeculture", label: "😂 Meme Culture", color: "info" },
    { value: "miscellaneous", label: "🎯 Miscellaneous", color: "secondary" }
  ];

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-10">
          {/* Header Card */}
          <div className="card shadow-lg border-0 mb-4">
            <div className="card-header py-4" style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none"
            }}>
              <div className="row align-items-center">
                <div className="col">
                  <h2 className="h3 mb-0 text-white">
                    <i className="fas fa-plus-circle me-2"></i>
                    Add New Product
                  </h2>
                  <p className="text-white-50 mb-0">Fill in the details below to add a new item to your store</p>
                </div>
                <div className="col-auto">
                  <span className="badge bg-light text-dark fs-6 p-2">
                    <i className="fas fa-cube me-1"></i>
                    Inventory
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Form Section */}
            <div className="col-lg-7">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body p-4">
                  {message && (
                    <div className={`alert alert-dismissible fade show ${
                      message.includes("✅") ? "alert-success" : "alert-danger"
                    }`} role="alert">
                      <div className="d-flex align-items-center">
                        <i className={`fas ${
                          message.includes("✅") ? "fa-check-circle" : "fa-exclamation-triangle"
                        } me-2`}></i>
                        <span>{message}</span>
                      </div>
                      <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      {/* Item Name */}
                      <div className="col-12 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-tag text-primary me-2"></i>
                          Item Name *
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="fas fa-cube text-muted"></i>
                          </span>
                          <input
                            type="text"
                            name="name"
                            className="form-control border-start-0"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            required
                            style={{ paddingLeft: "0" }}
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="col-12 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-align-left text-info me-2"></i>
                          Description
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0 align-items-start pt-2">
                            <i className="fas fa-pen text-muted"></i>
                          </span>
                          <textarea
                            name="description"
                            className="form-control border-start-0"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your product..."
                            rows="3"
                            style={{ paddingLeft: "0" }}
                          />
                        </div>
                      </div>

                      {/* Category and Price */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-folder-open text-warning me-2"></i>
                          Category *
                        </label>
                        <select
                          name="category"
                          className="form-select"
                          value={formData.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- Select Category --</option>
                          {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-rupee-sign text-success me-2"></i>
                          Price *
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">₹</span>
                          <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                      </div>

                      {/* Stock Quantity and Image URL */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-boxes text-primary me-2"></i>
                          Stock Quantity *
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="fas fa-layer-group text-muted"></i>
                          </span>
                          <input
                            type="number"
                            name="stockQuantity"
                            className="form-control"
                            value={formData.stockQuantity}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-image text-danger me-2"></i>
                          Image URL
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="fas fa-link text-muted"></i>
                          </span>
                          <input
                            type="text"
                            name="imageUrl"
                            className="form-control"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button
                        type="button"
                        className="btn btn-outline-secondary me-md-2"
                        onClick={() => setShowPreview(!showPreview)}
                        disabled={!formData.name}
                      >
                        <i className="fas fa-eye me-2"></i>
                        {showPreview ? "Hide Preview" : "Show Preview"}
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary px-4"
                        disabled={loading}
                        style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          border: "none",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
                        onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Adding Item...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-plus-circle me-2"></i>
                            Add Item
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="col-lg-5 mt-4 mt-lg-0">
              {showPreview && formData.name && (
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">
                      <i className="fas fa-eye me-2 text-primary"></i>
                      Product Preview
                    </h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      {formData.imageUrl ? (
                        <img 
                          src={formData.imageUrl} 
                          alt="Preview" 
                          className="img-fluid rounded shadow"
                          style={{ 
                            maxHeight: "200px",
                            objectFit: "cover" 
                          }}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                          }}
                        />
                      ) : (
                        <div 
                          className="bg-light rounded d-flex align-items-center justify-content-center"
                          style={{ height: "200px" }}
                        >
                          <i className="fas fa-image fa-3x text-muted"></i>
                        </div>
                      )}
                    </div>
                    
                    <h4 className="text-primary">{formData.name}</h4>
                    
                    {formData.category && (
                      <span className={`badge bg-${
                        categories.find(cat => cat.value === formData.category)?.color || 'secondary'
                      } mb-2`}>
                        {categories.find(cat => cat.value === formData.category)?.label}
                      </span>
                    )}
                    
                    {formData.description && (
                      <p className="text-muted mt-2">{formData.description}</p>
                    )}
                    
                    <div className="row mt-3">
                      <div className="col-6">
                        <strong className="text-success fs-5">₹{formData.price || "0"}</strong>
                        <br />
                        <small className="text-muted">Price</small>
                      </div>
                      <div className="col-6">
                        <strong className="text-primary fs-5">{formData.stockQuantity || "0"}</strong>
                        <br />
                        <small className="text-muted">In Stock</small>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              {!showPreview && (
                <div className="card shadow-sm border-0">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-info-circle me-2 text-info"></i>
                      Quick Tips
                    </h6>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        Fill all required fields (*)
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        Use high-quality images
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-check text-success me-2"></i>
                        Set appropriate pricing
                      </li>
                      <li>
                        <i className="fas fa-check text-success me-2"></i>
                        Monitor stock levels
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemForm;