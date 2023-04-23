import styled from "styled-components";

export const Container = styled.header`
    width: 100%;
    padding: 1.5rem 0;
    display: flex;
    justify-content: center;
    background-color: #fbfbfb;
    border-bottom: 2px solid #1f3156;
`

export const Items = styled.div`
    width: 1140px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        color: #1f3156;
    }

    ul{
        list-style: none;
    }

    ul li{
        float: left;
    }

    ul li:nth-child(1){
        margin-right: 1rem;
    }

    a{
        display: inline-block;
        background-color: #1f3156;
        padding: 8px;
        border-radius: 8px;
        text-decoration: none;
        color: #fff;
    }

    a:hover{
        background-color: #192742;
    }

    @media (max-width: 1138px) {
        width: 100%;
        padding: 0 1.2rem;
    }

    @media (max-width: 600px) {
        justify-content: center;
        flex-direction: column;

        img{
            margin-bottom: 2rem;
        }
    }

    @media (max-width: 420px) {
        img{
            display: none;
        }
    }
`