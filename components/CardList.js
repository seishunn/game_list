import React from 'react';
import styled from "styled-components";
import Link from "next/link";
import Card from "@/components/Card";

const CardListI = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  padding: 10px 0;
  
  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const CardList = ({cards = []}) => {
    return (
        <CardListI>
            {cards.map(card =>
                <Link href={`/game/${card.slug}`}>
                    <Card
                        key={card.id}
                        poster={card.background_image}
                        title={card.name}
                        date={card.released}
                        rating={card.rating}
                    />
                </Link>
            )}
        </CardListI>
    );
};

export default CardList;