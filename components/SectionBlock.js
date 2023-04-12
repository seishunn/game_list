import React from 'react';
import styled from "styled-components";

const SectionBlockI = styled.div`
  padding: 10px 0;
`
const Subtitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 5px;
`

const SectionBlock = ({title = "", children}) => {
    return (
        <SectionBlockI>
            <Subtitle>{title}</Subtitle>
            {children}
        </SectionBlockI>
    );
};

export default SectionBlock;
