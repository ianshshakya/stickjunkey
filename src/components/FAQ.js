import React, { useContext } from "react";
import { ColorContext } from "../Contexts/ColorContext";

const FAQ = () => {
    const { backgroundColor, color } = useContext(ColorContext); // Extract values

    const styles = {
        faq: {
            backgroundColor: "#040a08", // Use background color from context
            color: color // Use text color from context
        }
    };

    return (
        <div id="accordion" style={{backgroundColor}}>
            {/* First Item */}
            <div className="card mb-2" style={styles.faq}>
                <div className="card-header">
                    <h5 className="mb-0">
                        <div className="text-white">FAQ</div>
                    </h5>
                </div>
            </div>

            {/* Second Item */}
            <div className="card my-2">
                <div  id="headingOne" style={styles.faq} className="text-white mb-0 card-header btn outline-none"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            
                            >
                    
                        
                            Why do we sell Stickers?
                       
                    
                </div>
                <div
                    id="collapseOne"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordion"
                >
                    <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                </div>
            </div>

            {/* Third Item */}
            <div className="card my-2">
                <div className="card-header" id="headingTwo" style={styles.faq}>
                    <h5 className="mb-0">
                        <button
                            className="btn btn-link collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            Collapsible Group Item #2
                        </button>
                    </h5>
                </div>
                <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordion"
                >
                    <div className="card-body">Quisque facilisis erat a dui.</div>
                </div>
            </div>

            {/* Fourth Item */}
            <div className="card">
                <div className="card-header" id="headingThree" style={styles.faq}>
                    <h5 className="mb-0">
                        <button
                            className="btn btn-link collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            Collapsible Group Item #3
                        </button>
                    </h5>
                </div>
                <div
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordion"
                >
                    <div className="card-body">Integer feugiat scelerisque varius.</div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
