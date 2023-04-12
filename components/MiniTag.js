import React from 'react';
import styled from "styled-components";

const MiniTagI = styled.span`
  display: inline-block;
  border-radius: 8px;
  color: #FFFFFF;
  background: #2D2D2D;
  margin: 5px;
  padding: 5px;
  font-size: 12px;
  cursor: default;
  
  ${props => props.color && `
    color: ${props.color}
  `}
  ${props => props.background && `
    background: ${props.background}
  `}
`

const MiniTag = ({children, ...props}) => {
    return (
        <MiniTagI {...props}>
            {children}
        </MiniTagI>
    );
};

export default React.memo(MiniTag);
