import React from 'react';
import styled from "styled-components";

const ContainerI = styled.div`
  max-width: 1420px;
  width: 100%;
  padding: 0 10px;
  margin: 0 auto;
`

const Container = ({children}) => {
    return (
        <ContainerI>
            {children}
        </ContainerI>
    );
};

export default Container;
