//HeroCarousel.jsx dùng để tạo 1 carousel hiển thị các hình ảnh
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { banners } from '../data/bannerImage';

function HeroCarousel() {
    return (
        <Carousel fade={true} interval={3000} pause ="hover">
            {banners.map((banner, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={banner.image}
                        alt={`Slide ${index + 1}`}
                    />
                    <Carousel.Caption>
                        <h3>{banner.title}</h3>
                        <p>{banner.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default HeroCarousel;