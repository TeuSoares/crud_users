import styled from "styled-components";

interface ButtonProps {
    background: string;
    backgroundHover: string;
}

export const Container = styled.section`
    width: 900px;
    margin: 0 auto;

    h1{
        color: #1f3156;
    }

    a{
        text-decoration: none;
        color: #fff;
    }

    @media (max-width: 898px){
        width: 100%;
        padding: 0 1.2rem;
    }
`

export const Button = styled.button`
    background-color: ${({background}: ButtonProps) => background};
    padding: .6rem 1.5rem;
    border-radius: 5px;
    text-decoration: none;
    color: #fff;
    border: none;
    cursor: pointer;
    border: none;
    font-size: 1em;

    &:hover{
        background-color: ${({backgroundHover}: ButtonProps) => backgroundHover};
    }

    &:nth-child(1){
        margin-right: .5rem;
    }
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 605px){
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1{
            margin-bottom: 1rem;
        }
    }
`

export const Box = styled.div`
    width: 100%;
    background-color: #fbfbfb;
    border: 1px solid #1f3156;
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 1.5rem;
`

export const Card = styled.div`
    background-color: #1f3156;
    color: #fff;
    margin-bottom: 1rem;
    padding: 1rem;

    &:nth-child(8){
        margin-bottom: 0;
    }

    h5{
        font-size: 1em;
        margin-bottom: 5px;
    }
`