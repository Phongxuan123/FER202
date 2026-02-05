//Carousel sẽ để slide các ảnh slide pizza gồm pizza1.jpg, pizza2.jpg, pizza3.jpg, pizza4.jpg, pizza5.jpg.
import React from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import { slideImages } from '../data/slideImages';

function Carousel() {
    return (
        <BootstrapCarousel>
            {slideImages.map((item, index) => (
                <BootstrapCarousel.Item key={index}>
                    <img 
                        className="d-block w-100" 
                        src={item.image} 
                        alt={`Pizza Slide ${index + 1}`} 
                        style={{ maxHeight: '500px', objectFit: 'cover' }}
                    />
                    <BootstrapCarousel.Caption>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </BootstrapCarousel.Caption>
                </BootstrapCarousel.Item>
            ))}
        </BootstrapCarousel>
    );
}

export default Carousel;
