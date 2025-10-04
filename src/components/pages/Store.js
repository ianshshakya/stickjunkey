import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Store = () => {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]); // store items
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/items/category/${categoryId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) throw new Error("Failed to fetch items");

                const data = await response.json();
                if (Array.isArray(data)) setItems(data);
                else if (data.data && Array.isArray(data.data)) setItems(data.data);
                else if (data.items && Array.isArray(data.items)) setItems(data.items);
                else {
                    setItems([]);
                    console.warn("Unexpected API response structure:", data);
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [categoryId]);

    const styles = {
        cloud: {
            width: "100%",
            backgroundImage: "linear-gradient(to bottom , #1a1a1aff ,#000000ff)",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            justifyContent: "center",
            alignItems: "center",
        },
        categ: {
            fontFamily: '"Boldonse", system-ui',
            fontWeight: "400",
            fontStyle: "normal",
            paddingTop: "100px",
        },
    };

    const handleAddCart = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                },
                credentials: "include",
                body: JSON.stringify({ quantity: 1 })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert("Item added to cart!");
            console.log(data.cartItem);
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Error adding to cart: " + error.message);
        }
    };


    return (
        <div className="py-5" style={styles.cloud}>
            <div className="h1 fw-2 mb-5 pb-5 ms-5  mt-5 text-start text-light" style={styles.categ}>
                CATEGORY : {categoryId}
            </div>

            {loading ? (
                <p className="text-center">Loading items...</p>
            ) : (
                <div className="d-flex flex-wrap gap-3 justify-content-start mx-5">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="card-wrapper position-relative"
                            style={{ display: "inline-block" }}
                        >
                            <div className="card h-100 shadow-sm border-0 position-relative overflow-hidden">
                                <img
                                    src={item.imageUrl || "https://via.placeholder.com/300"}
                                    alt={item.name}
                                    style={{ height: "300px", width: "100%", objectFit: "cover" }}
                                />

                                <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white p-3">
                                    <h5 className="mb-2 text-center">{item.name}</h5>
                                    <p className="text-center small">
                                        {item.description || "No description available"}
                                    </p>
                                    <h6 className="fw-bold">₹ {item.price}</h6>
                                    <p
                                        className={
                                            item.stockQuantity > 0
                                                ? "text-success fw-bold"
                                                : "text-danger fw-bold"
                                        }
                                    >
                                        {item.stockQuantity > 0
                                            ? `In Stock: ${item.stockQuantity}`
                                            : "Out of Stock"}
                                    </p>

                                    {/* Corrected button */}
                                    <button
                                        onClick={() => handleAddCart(item._id)}
                                        className="btn btn-light btn-sm mt-2"
                                        disabled={item.stockQuantity === 0}
                                    >
                                        {item.stockQuantity > 0 ? "Add to Cart" : "Unavailable"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Store;
