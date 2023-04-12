import styled, {createGlobalStyle} from "styled-components";
import Navbar from "@/components/Navbar";
import List from "@/components/List";
import {wrapper} from "@/store";
import {setGamesThunk} from "@/store/actions-creators/games";
import {getPlatformsThunk} from "@/store/actions-creators/criteria";
import {useCallback, useEffect, useMemo, useState} from "react";
import {debounceFn} from "@/utils/debounce";
import {useActions} from "@/hooks/useActions";
import {useSelector} from "react-redux";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    color: #FFFFFF;
  }

  a {
    text-decoration: none;
  }
`
const App = styled.div`
  background: #151515;
  min-height: 100vh;
`

const Index = () => {
    const games = useSelector(state => state.games);
    const perPage = useSelector(state => state.games.perPage);

    const [searchQuery, setSearchQuery] = useState("");
    const [platform, setPlatform] = useState("");
    const [order, setOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const sortedGames = useMemo(() => {
        switch (order) {
            case "popular":
                return [...games.games].sort((a, b) => b.rating - a.rating)
            case "notpopular":
                return [...games.games].sort((a, b) => a.rating - b.rating)
            case "new":
                return [...games.games].sort((a, b) => new Date(b.released).getTime() - new Date(a.released).getTime())
            case "old":
                return [...games.games].sort((a, b) => new Date(a.released).getTime() - new Date(b.released).getTime())
        }
        return games.games
    }, [games.games, order])

    const {setGamesThunk, addGamesThunk} = useActions();

    useEffect(() => {
        setCurrentPage(() => 1);
        setGamesThunk(1, perPage, platform, searchQuery)
    }, [platform])

    useEffect(() => {
        if (currentPage > 1 && (currentPage <= (games.totalCount / perPage))) {
            addGamesThunk(currentPage, perPage, platform, searchQuery)
        }
    }, [currentPage])

    const searchDeb = useCallback(debounceFn((str, selectedPlatform, page) => {
        setCurrentPage(() => 1);
        setGamesThunk(page, 20, selectedPlatform, str)
    }, 800), []);

    const searchGameFN = (str) => {
        setSearchQuery(str);
        searchDeb(str, "", currentPage);
    }

    return (
        <>
            <Global/>
            <App>
                <Navbar searchQuery={searchQuery} setSearchQuery={searchGameFN}/>
                <List
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    games={sortedGames}
                    order={order}
                    setOrder={setOrder}
                    platform={platform}
                    setPlatform={setPlatform}/>
            </App>
        </>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async () => {
        const dispatch = store.dispatch
        await dispatch(await setGamesThunk(1, 30, "", ""))
        await dispatch(await getPlatformsThunk())
    }
);