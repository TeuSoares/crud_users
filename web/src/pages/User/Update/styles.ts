import styled from "styled-components";

export const Container = styled.section`
    width: 420px;
    margin: 0 auto;

    h1{
        color: #1f3156;
        text-align: center;
        margin-bottom: 1.2rem;
    }

    @media (max-width: 418px) {
        width: 100%;
        padding: 0 1.2rem;
    }
`