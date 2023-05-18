import styled from "styled-components";

interface IContainer {
    imgWidth?: string;
}

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    img {
        width: ${({imgWidth}: IContainer) => imgWidth ? imgWidth : "100px"};
    }
`