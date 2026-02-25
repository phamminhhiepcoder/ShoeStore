import Slider from "react-slick";

const ProductSlider = ({ images, name }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <Slider {...settings}>
            {images?.map((img, index) => (
                <div key={index}>
                    <img
                        src={img.url}
                        alt={name}
                        style={{
                            width: "100%",
                            height: "380px",
                            objectFit: "cover",
                            borderRadius: "10px",
                        }}
                    />
                </div>
            ))}
        </Slider>
    );
};

export default ProductSlider;
