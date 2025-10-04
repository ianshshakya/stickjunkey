import React, { useEffect, useState } from 'react';
import Categories from '../Categories';
import Poster from '../Poster';

import slide1 from "../../images/slide1.webp";
import slide2 from "../../images/slide2.webp";
import slide3 from "../../images/slide3.webp";

const Home = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleResize = () => setIsMobile(window.innerWidth < 768);

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const scale = Math.min(1 + scrollY / 1000, 1.2);

    const preloadImages = (urls) => {
        urls.forEach((url) => {
            const img = new Image();
            img.src = url;
        });
    };

    useEffect(() => {
        preloadImages([slide1, slide2, slide3]);
    }, []);

    const fontStyle = {
        fontFamily: '"Arimo", sans-serif',
        fontSize: isMobile ? "2.5rem" : "6rem", // Reduced mobile font size further
        fontStyle: "normal",
        lineHeight: "1.2",
        wordBreak: "break-word" // Prevent long words from overflowing
    };

    const captions = [
        { buttonText: "Explore" },
        { buttonText: "Buy Now" },
        { buttonText: "Browse Collection" }
    ];

    const slides = [slide1, slide2, slide3];

    return (
        <>
            <div
                id="myCarousel"
                className="carousel slide carousel-fade h-100 section overflow-hidden" // Added overflow-hidden
                style={{
                    transform: `scale(${scale})`,
                    transition: "transform 0.2s ease-out",
                    width: "100vw", // Ensure full viewport width
                    maxWidth: "100%" // Prevent horizontal overflow
                }}
                data-bs-ride="carousel"
            >
                {/* Carousel Inner */}
                <div className="carousel-inner vh-100 mw-100"> {/* Added mw-100 */}
                    {slides.map((img, index) => (
                        <div key={index} className={`carousel-item h-100 ${index === 0 ? "active" : ""}`}>
                            <img
                                src={img}
                                className="d-block w-100 h-100 object-fit-cover"
                                alt={`Slide ${index + 1}`}
                                loading={index === 0 ? "eager" : "lazy"}
                                style={{
                                    filter: "brightness(40%)",
                                    maxWidth: "100%" // Ensure image doesn't overflow
                                }}
                            />
                            <div className="container h-100 px-0"> {/* Removed horizontal padding */}
                                <div className="carousel-caption h-100 w-100 d-flex flex-column align-items-start justify-content-between pb-3 pb-md-5 ps-3 pe-3 ps-md-4 pe-md-4"> {/* Adjusted padding */}
                                    <div></div>
                                    <div className={`d-flex flex-column ${isMobile ? '' : 'flex-md-row'} w-100 mx-0`}> {/* Removed margin */}
                                        <h1 className={`${isMobile ? 'col-12 ps-0' : 'col-md-7 ps-md-0 ms-md-n3'} headingforhover text-start mb-3 mb-md-0`} style={fontStyle}>
                                            I'LL <br />KILL HIM!
                                        </h1>
                                        <div className={`${isMobile ? 'col-12 px-2' : 'col-md-3 px-md-3'}`}>
                                            <p className={isMobile ? 'd-none d-md-block' : ''}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            </p>
                                            <p className="mt-3">
                                                <a className="btn btn-lg btn-light rounded-5 w-100 w-md-auto" href="#category">
                                                    {captions[index].buttonText}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Carousel Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <Categories scrollY={scrollY} />
            <Poster />
        </>
    );
};

export default Home;