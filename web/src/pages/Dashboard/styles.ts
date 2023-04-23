import styled from "styled-components";

export const Container = styled.section`
    width: 1140px;
    margin: 0 auto;

    h1{
        color: #1f3156;
    }

    table{
        width: 100%;
        text-align: center;
        border-collapse: collapse;
        margin-top: 1.5rem;
    }

    th{
        padding: 1rem 1.5rem;
        background-color: #1f3156;
        font-size: .7rem;
        text-transform: uppercase;
        color: #fff;
    }

    td{
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #ccc;
        background-color: #fbfbfb;
    }

    a{
        background-color: #1f3156;
        padding: 8px;
        border-radius: 8px;
        text-decoration: none;
        color: #fff;
    }

    a:hover{
        background-color: #192742;
    }

    @media (max-width: 1138px){
        width: 100%;
        padding: 0 1.2rem;
        overflow-x: scroll;
    }
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    input{
        padding: .3rem .5rem;
        margin-right: .3rem;
    }

    button{
        padding: .3rem .5rem;
        background-color: #1f3156;
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 1em;
    }

    button:hover{
        background-color: #192742;
    }

    @media (max-width: 560px){
        flex-direction: column;
        justify-content: center;

        h1{
            margin-bottom: 1rem;
        }
    }

    @media (max-width: 320px){
        input, button{
            display: block;
            width: 100%;
        }

        input{
            margin-bottom: .5rem;
        }
    }
`