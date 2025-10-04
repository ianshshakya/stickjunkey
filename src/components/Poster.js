import React, {useState, useEffect, useRef} from "react";

const Poster = () => {
  const stickerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [size, setSize] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (stickerRef.current) {
        const rect = stickerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;
        
        // Calculate when the element first appears at the bottom of the viewport
        const elementBottomPosition = windowHeight - rect.top;
        
        // Calculate the visible percentage (0 when bottom first appears, 1 when top reaches top of viewport)
        const visiblePercentage = Math.min(1, Math.max(0, elementBottomPosition / (windowHeight + elementHeight)));
        
        // Adjust these values to control the animation range
        const maxOffset = isMobile ? 100 : 150;
        const maxScale = 1 + (isMobile ? 0.2 : 0.3);
        
        // Calculate movement and scale based on visible percentage
        const moveLeft = visiblePercentage * maxOffset;
        const scale = 1 + (visiblePercentage * (maxScale - 1));
        
        setSize(scale);
        setOffset(moveLeft);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const styles = {
    cloud: {
      width: "100%",
      minHeight: "125vh",
      backgroundColor: "#000000ff",
      padding: "15px",
      position: "relative",
      margin: "0 auto",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    posterHead: {
      fontFamily: '"Boldonse", system-ui',
      fontWeight: "600",
      fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
      fontStyle: "normal",
      textAlign: "center",
      marginBottom: "1rem"
    },
    posterBody: {
      fontFamily: '"Merriweather", serif',
      fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
      fontWeight: "400",
      maxWidth: "90%",
      textAlign: "center",
      marginBottom: "1.5rem"
    },
    image: {
      height: "auto",
      maxHeight: "260px",
      width: "auto",
      maxWidth: "100%",
      transition: "transform 0.3s ease-in-out",
    },
    sticker: {
      height: "auto",
      maxHeight: isMobile ? "200px" : "300px",
      width: "auto",
      maxWidth: "100%",
      transition: "transform 0.1s linear",
      transform: `translateX(${offset}px) translateY(${-offset * 0.5}px) scale(${size})`,
      willChange: "transform" // Optimize for animation
    }
  };

  // Image sources
  const images = [
    require("../images/p1.webp"),
    require("../images/p7.webp"),
    require("../images/p6.webp"),
    require("../images/p2.webp"),
    require("../images/p3.webp"),
    require("../images/p5.webp"),
  ];

  // Splitting images into groups - mobile shows 1, desktop shows 3
  const chunkSize = isMobile ? 1 : 3;
  const groupedImages = [];
  for (let i = 0; i < images.length; i += chunkSize) {
    groupedImages.push(images.slice(i, i + chunkSize));
  }

  return (
    <div className="d-flex flex-column" style={styles.cloud}>
      {/* First Row */}
      <div className="row w-100 d-flex align-items-center text-center flex-column-reverse flex-md-row">
        <div className="col-12 col-md-4 text-center p-3">
          <img 
            className=" m-md-4 img-fluid" 
            style={styles.sticker} 
            src={require("../images/aeloplane.webp")} 
            alt="sticker" 
            ref={stickerRef}
          />
        </div>
        <div className="col-12 col-md-8 d-flex flex-column justify-content-center align-items-center p-3">
          <div style={styles.posterHead}>
            <i className="text-light">PREMIUM STICKERS</i>
          </div>
          <div className="container text-light" style={styles.posterBody}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </div>
      </div>

      {/* Second Row with Carousel */}
      <div className="row w-100 h-auto d-flex align-items-center text-center flex-column flex-md-row">
        <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center p-3 order-md-1 order-2">
          <div style={styles.posterHead}>
            <i className="text-light">VINTAGE POSTERS</i>
          </div>
          <div className="container text-light" style={styles.posterBody}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <div className="col-12 col-md-8 p-3 order-md-2 order-1">
          <div id="posterCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner carousel2">
              {groupedImages.map((group, index) => (
                <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                  <div className="d-flex flex-wrap justify-content-center">
                    {group.map((src, idx) => (
                      <div key={idx} className="p-2" style={{flex: "0 0 auto"}}>
                        <img 
                          className="img-fluid posters" 
                          style={styles.image} 
                          src={src} 
                          alt={`poster${idx}`} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-control-prev d-none d-md-flex" type="button" data-bs-target="#posterCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next d-none d-md-flex" type="button" data-bs-target="#posterCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;