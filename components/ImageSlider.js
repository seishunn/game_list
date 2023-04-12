import React, {useState} from 'react';
import styled from "styled-components";

const SliderI = styled.div`
  height: 100%;
  position: relative;
  & > button {
    top: 50%;
    transform: translateY(-50%);
  }
  & > button:first-child {
    left: 10px;
  }
  & > button:last-child {
    right: 10px;
  }
`
const BackImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  background-image: ${props => `url(${props.slides[props.currentIndex]?.image})`};
`
const SliderButton = styled.button`
  background: rgba(0, 0, 0, .8);
  border-radius: 50%;
  font-size: 10px;
  width: 50px;
  height: 50px;
  position: absolute;
  cursor: pointer;
`

const ImageSlider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevImage = () => {
        const index = currentIndex === 0? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(index);
    }
    const goToNextImage = () => {
        const index = currentIndex === slides.length - 1? 0 : currentIndex + 1;
        setCurrentIndex(index);
    }

    return (
        <SliderI>
            <SliderButton onClick={goToPrevImage}>Previous</SliderButton>
            <BackImage slides={slides} currentIndex={currentIndex}/>
            <SliderButton onClick={goToNextImage}>Next</SliderButton>
        </SliderI>
    );
};

export default ImageSlider;
