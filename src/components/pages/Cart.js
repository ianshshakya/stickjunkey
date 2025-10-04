import React, { useEffect, useState } from "react";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderSummary, setOrderSummary] = useState({
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0
    });

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/cart/item`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) throw new Error("Failed to fetch cart items");

                const data = await response.json();
                console.log("Cart API Response:", data);

                let items = [];
                if (Array.isArray(data)) {
                    items = data;
                } else if (data.data && Array.isArray(data.data)) {
                    items = data.data;
                } else if (data.items && Array.isArray(data.items)) {
                    items = data.items;
                } else if (data._id) {
                    items = [data];
                }

                setCartItems(items);
                calculateOrderSummary(items);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const calculateOrderSummary = (items) => {
        const subtotal = items.reduce(
            (sum, item) => sum + (item.price * (item.quantity || 1)),
            0
        );
        const shipping = subtotal > 500 ? 0 : 40;
        const tax = subtotal * 0.18; // 18% GST
        const total = subtotal + shipping + tax;

        setOrderSummary({
            subtotal: Math.round(subtotal),
            shipping,
            tax: Math.round(tax),
            total: Math.round(total)
        });
    };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ quantity: newQuantity })
            });
            if (!response.ok) throw new Error("Failed to update quantity");

            const updatedItems = cartItems.map(item =>
                item._id === itemId ? { ...item, quantity: newQuantity } : item
            );
            setCartItems(updatedItems);
            calculateOrderSummary(updatedItems);
        } catch (error) {
            console.error("Error updating quantity:", error);
            alert("Error updating quantity: " + error.message);
        }
    };

    const removeItem = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to remove item");

            const updatedItems = cartItems.filter(item => item._id !== itemId);
            setCartItems(updatedItems);
            calculateOrderSummary(updatedItems);
            alert("Item removed from cart!");
        } catch (error) {
            console.error("Error removing item:", error);
            alert("Error removing item: " + error.message);
        }
    };

    const handleCheckout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/orders/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    shippingAddress: "User's address" // Replace with a real input if you have one
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert("Order placed successfully!");
            setCartItems([]);
            calculateOrderSummary([]);
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("Error during checkout: " + error.message);
        }
    };

    const styles = {
        cloud: {
            background: "linear-gradient(135deg, #000000ff 0%, #07020cff 100%)",
            minHeight: "100vh",
            padding: "20px 0"
        },
        container: {
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 15px"
        },
        transparentCard: {
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "15px"
        },
        transparentHeader: {
            background: "rgba(255, 255, 255, 0.05)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "15px 15px 0 0"
        },
        tableHeader: {
            background: "rgba(0, 0, 0, 0.4)",
            border: "none",
            borderRadius: "10px"
        },
        tableBody: {
            background: "rgba(0, 0, 0, 0.25)",
            borderRadius: "0 0 10px 10px"
        },
        tableRow: {
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(0,0,0,1)"
        }
    };

    if (loading) {
        return (
            <div style={styles.cloud}>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.cloud}>
            <div style={styles.container}>
                {/* Header - Responsive */}
                <div className="text-white mb-5 pt-4">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <h1 className="display-4 display-md-3 text-md-end text-center fw-bold mb-3 mt-5 pt-5">
                                YOUR CART
                            </h1>
                            <p className="lead text-md-end text-center mb-0">
                                Review your items and proceed to checkout
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Cart Items */}
                    <div className="col-lg-8">
                        <div className="card shadow-lg" style={styles.transparentCard}>
                            <div className="card-header py-3 py-md-4" style={styles.transparentHeader}>
                                <h3 className="mb-0 text-light h4 h5-md">
                                    <i className="fas fa-shopping-bag me-2 text-primary"></i>
                                    Cart Items ({cartItems.length})
                                </h3>
                            </div>
                            <div className="card-body p-0">
                                {cartItems.length === 0 ? (
                                    <div className="text-center py-5">
                                        <i className="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                                        <h4 className="text-light">Your cart is empty</h4>
                                        <p className="text-muted">Add some items to get started</p>
                                        <button className="btn btn-primary mt-3">
                                            <i className="fas fa-store me-2"></i>
                                            Continue Shopping
                                        </button>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table
                                            className="table table-borderless mb-0 table-dark-custom"
                                            style={{ backgroundColor: "black" }}
                                        >
                                            <thead>
                                                <tr style={styles.tableHeader}>
                                                    <th className="ps-2 ps-md-4 text-light">Product</th>
                                                    <th className="text-light d-none d-md-table-cell">Price</th>
                                                    <th className="text-light text-center">Qty</th>
                                                    <th className="text-light d-none d-sm-table-cell">Total</th>
                                                    <th className="text-light pe-2 pe-md-4 text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody style={styles.tableBody}>
                                                {cartItems.map((item) => (
                                                    <tr key={item._id} style={styles.tableRow}>
                                                        <td className="ps-2 ps-md-4">
                                                            <div className="d-flex align-items-center">
                                                                <img
                                                                    src={item.imageUrl || "https://via.placeholder.com/80"}
                                                                    alt={item.name}
                                                                    className="rounded-3 me-2 me-md-3"
                                                                    style={{
                                                                        width: "45px", // ✅ smaller on phones
                                                                        height: "45px",
                                                                        objectFit: "cover",
                                                                        minWidth: "45px",
                                                                    }}
                                                                />
                                                                <div className="flex-grow-1">
                                                                    <h6 className="mb-1 text-light small">{item.name}</h6>
                                                                    <small className="text-muted d-block">{item.category}</small>
                                                                    {/* Mobile price + total */}
                                                                    <div className="d-md-none mt-1">
                                                                        <div className="text-primary fw-bold">₹{item.price}</div>
                                                                        <div className="text-light fw-bold">
                                                                            ₹{item.price * (item.quantity || 1)}
                                                                        </div>
                                                                    </div>
                                                                    {item.stockQuantity <= 5 && item.stockQuantity > 0 && (
                                                                        <div className="text-warning small">
                                                                            <i className="fas fa-exclamation-triangle me-1"></i>
                                                                            Only {item.stockQuantity} left!
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Price (hidden on mobile) */}
                                                        <td className="d-none d-md-table-cell">
                                                            <div className="fw-bold text-primary">₹{item.price}</div>
                                                        </td>

                                                        {/* Quantity */}
                                                        <td className="text-center">
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <button
                                                                    className="btn btn-outline-light btn-sm px-2 py-1"
                                                                    onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                                                                    disabled={(item.quantity || 1) <= 1}
                                                                >
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                                <span
                                                                    className="mx-2 fw-bold text-light"
                                                                    style={{
                                                                        minWidth: "18px",
                                                                        textAlign: "center",
                                                                        fontSize: "0.9rem", // ✅ smaller on phones
                                                                    }}
                                                                >
                                                                    {item.quantity || 1}
                                                                </span>
                                                                <button
                                                                    className="btn btn-outline-light btn-sm px-2 py-1"
                                                                    onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                                                                    disabled={(item.quantity || 1) >= item.stockQuantity}
                                                                >
                                                                    <i className="fas fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        </td>

                                                        {/* Total (hidden on extra small) */}
                                                        <td className="d-none d-sm-table-cell text-center">
                                                            <div className="fw-bold text-light">
                                                                ₹{item.price * (item.quantity || 1)}
                                                            </div>
                                                        </td>

                                                        {/* Action */}
                                                        <td className="text-center pe-2 pe-md-4">
                                                            <button
                                                                className="btn btn-outline-danger btn-sm px-2 py-1"
                                                                onClick={() => removeItem(item._id)}
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="col-lg-4">
                        <div className="card shadow-lg" style={{ ...styles.transparentCard, position: "sticky", top: "20px" }}>
                            <div className="card-header py-3" style={{
                                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "15px 15px 0 0"
                            }}>
                                <h4 className="mb-0 text-white h5">
                                    <i className="fas fa-receipt me-2"></i>
                                    Order Summary
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-light">Subtotal:</span>
                                    <span className="fw-bold text-light">₹{orderSummary.subtotal}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-light">Shipping:</span>
                                    <span className={orderSummary.shipping === 0 ? "text-success fw-bold" : "text-light"}>
                                        {orderSummary.shipping === 0 ? "FREE" : `₹${orderSummary.shipping}`}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-light">Tax (18%):</span>
                                    <span className="text-light">₹{orderSummary.tax}</span>
                                </div>
                                <hr style={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
                                <div className="d-flex justify-content-between mb-4">
                                    <strong className="text-light">Total:</strong>
                                    <strong className="text-primary h4">₹{orderSummary.total}</strong>
                                </div>

                                {orderSummary.subtotal > 0 && orderSummary.subtotal < 500 && (
                                    <div className="alert text-center small mb-3" style={{
                                        background: "rgba(13, 110, 253, 0.2)",
                                        border: "1px solid rgba(13, 110, 253, 0.3)",
                                        color: "#8bb9fe"
                                    }}>
                                        <i className="fas fa-shipping-fast me-2"></i>
                                        Add ₹{500 - orderSummary.subtotal} more for FREE shipping!
                                    </div>
                                )}

                                <button
                                    className="btn btn-primary btn-lg w-100 py-3 mb-3"
                                    onClick={handleCheckout}
                                    disabled={cartItems.length === 0}
                                    style={{
                                        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)",
                                        border: "none",
                                        fontSize: "1rem",
                                        backdropFilter: "blur(10px)"
                                    }}
                                >
                                    <i className="fas fa-lock me-2"></i>
                                    Proceed to Checkout
                                </button>

                                <div className="text-center">
                                    <small className="text-muted">
                                        <i className="fas fa-shield-alt me-1"></i>
                                        Secure checkout · 100% Protected
                                    </small>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="card mt-4 d-none d-md-block" style={styles.transparentCard}>
                            <div className="card-body text-center py-3">
                                <div className="row">
                                    <div className="col-4">
                                        <i className="fas fa-shipping-fast text-primary fa-lg mb-2"></i>
                                        <small className="d-block text-light">Free Shipping</small>
                                    </div>
                                    <div className="col-4">
                                        <i className="fas fa-shield-alt text-success fa-lg mb-2"></i>
                                        <small className="d-block text-light">Secure Payment</small>
                                    </div>
                                    <div className="col-4">
                                        <i className="fas fa-undo text-info fa-lg mb-2"></i>
                                        <small className="d-block text-light">Easy Returns</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;