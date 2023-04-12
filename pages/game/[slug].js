import styled, {createGlobalStyle} from "styled-components";
import {useRouter} from "next/router";
import axios from "axios";
import Container from "@/components/Container";
import {useState} from "react";
import MiniTag from "@/components/MiniTag";
import ImageSlider from "@/components/ImageSlider";
import SectionBlock from "@/components/SectionBlock";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    color: #FFFFFF;
  }
`
const GamePage = styled.div`
  background: #151515;
  min-height: 100vh;
  padding: 10px 0;
`
const GameHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 1000px) {
    flex-direction: row;
    & > * {
      flex: 0 1 50%;
    }
  }
`
const PosterBlock = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  margin: 10px 0;
  border-radius: 8px;
  overflow: hidden;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const Title = styled.div`
  font-size: 36px;
  line-height: 40px;
  font-weight: 700;
  padding: 5px;
  border-radius: 8px;
  text-align: center;

  @media (min-width: 1000px) {
    font-size: 72px;
    line-height: 74px;
  }
`
const Button = styled.button`
  display: block;
  background: royalblue;
  padding: 10px;
  font-size: 20px;
  margin-bottom: 10px;
  cursor: pointer;
`
const A = styled.a`
  text-decoration: none;
  padding: 5px;
`
const Description = styled.div`
  max-height: ${props => props.fullSize ? "" : "100px"};
  overflow: hidden;
  padding: 5px;
  position: relative;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 20px;

  & div {
    display: ${props => props.fullSize ? "none" : "block"};
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .5));
    position: absolute;
  }
`
const MiniButton = styled.button`
  background: #FFFFFF;
  color: #000000;
  padding: 3px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
`
const Wrapper = styled.div`
  width: 100%;
  height: 280px;
  margin: 15px auto;
  box-shadow: 0 0 10px 8px rgba(255, 255, 255, .05);
  @media (min-width: 800px) {
    width: 500px;
  }
`

export default function ({game, screenshots}) {
    const router = useRouter();
    const [fullSize, setFullSize] = useState(false);

    return (
        <>
            <Global/>
            <GamePage>
                <Container>
                    <Button onClick={() => router.push('/')}>К списку</Button>
                    <GameHeader>
                        <Title>{game.name}</Title>
                        <PosterBlock>
                            <img src={game.background_image} alt=""/>
                        </PosterBlock>
                    </GameHeader>
                    <div>
                        <MiniTag>
                            Rating: {game.rating}
                        </MiniTag>
                        <MiniTag>
                            Released: {game.released}
                        </MiniTag>
                        <MiniTag background={"royalblue"}>
                            <A href={game.website}>На сайт игры</A>
                        </MiniTag>
                    </div>
                    <SectionBlock title={"Screenshots"}>
                        <Wrapper>
                            <ImageSlider slides={screenshots.results}/>
                        </Wrapper>
                    </SectionBlock>
                    <SectionBlock title={"About"}>
                        <Description fullSize={fullSize}>
                            {game.description_raw}
                            <div/>
                        </Description>
                        <MiniButton
                            onClick={() => setFullSize(!fullSize)}>{fullSize ? "Show less" : "Show more"}</MiniButton>
                    </SectionBlock>
                </Container>
            </GamePage>
        </>
    )
}

export const getServerSideProps = async ({params}) => {
    const API_KEY = "9f22c74fe7104c219a08f164e1cb81d3";
    const response = await axios.get(`https://api.rawg.io/api/games/${params.slug}?key=${API_KEY}`);
    const screenshots = await axios.get(`https://api.rawg.io/api/games/${params.slug}/screenshots?key=${API_KEY}`)

    return {
        props: {
            game: response.data,
            screenshots: screenshots.data
        }
    }
}