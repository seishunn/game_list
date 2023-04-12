import React from 'react';
import styled from "styled-components";
import MiniTag from "@/components/MiniTag";

const CardI = styled.div`
  background: #202020;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  font-family: 'Antikor Mono', sans-serif;
`
const CardPoster = styled.div`
  position: relative;
  width: 100%;
  height: 200px;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const CardInfo = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
`
const CardTitle = styled.div`
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
`

const Card = ({poster = "", title = "", rating = 0, date = "", ...props}) => {
    return (
        <CardI {...props}>
            <div>
                <CardPoster>
                    <img src={poster} alt=""/>
                </CardPoster>
                <CardInfo>
                    <div>
                        <MiniTag>Rating: {rating}</MiniTag>
                        <MiniTag>Release: {date}</MiniTag>
                    </div>
                    <CardTitle>{title}</CardTitle>
                </CardInfo>
            </div>
        </CardI>
    );
};

export default React.memo(Card);