import React, {useEffect, useRef} from 'react';
import styled from "styled-components";
import Select from "@/components/Select";
import CardList from "@/components/CardList";
import Container from "@/components/Container";
import {useSelector} from "react-redux";

const ListI = styled.div`
  color: #FFFFFF;
  padding: 20px 0;
`
const SelectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px 0;
`
const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: center;

  @media (min-width: 800px) {
    font-size: 50px;
  }
`
const SubTitle = styled.h6`
  font-size: 14px;
  margin-top: 8px;
  text-align: center;

  @media (min-width: 800px) {
    font-size: 20px;
  }
`
const Empty = styled.div`
  font-size: 30px;
  font-family: 'Antikor Mono', sans-serif;
`

const List = ({setCurrentPage, games = [], order = "", setOrder, platform = "", setPlatform}) => {
    const dataFetchedRef = useRef(false);
    const criteria = useSelector(state => state.criteria);
    const lastElement = useRef();
    const observer = useRef();

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        let callback = function (entries) {
            if (entries[0].isIntersecting) {
                setCurrentPage((currentState) => currentState + 1)
            }
        }

        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current);
    }, [])

    return (
        <ListI>
            <Container>
                <Title>New and trending</Title>
                <SubTitle>Based on player counts and release date</SubTitle>
                <SelectList>
                    <Select
                        optionsList={[
                            {slug: "popular", name: "Popular"},
                            {slug: "notpopular", name: "Not popular"},
                            {slug: "new", name: "New games"},
                            {slug: "old", name: "Old games"},
                        ]}
                        defaultValue={"Order by"}
                        value={order}
                        changeValue={setOrder}
                    />
                    <Select
                        optionsList={criteria.platforms}
                        defaultValue={"Platforms"}
                        value={platform}
                        changeValue={setPlatform}
                    />
                </SelectList>
                {games.length
                    ? <CardList cards={games}/>
                    : <Empty>The list is empty!</Empty>
                }
                <div ref={lastElement}/>
            </Container>
        </ListI>
    )
};

export default List;