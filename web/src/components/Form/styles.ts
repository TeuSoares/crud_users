import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;

    label{
        margin-bottom: .3rem;
        font-weight: bold;
        color: #1f3156;
    }

    input, select{
        margin-bottom: 1rem;
        padding: .2rem;
        font-size: 1em;
    }

    div input:nth-child(2) {
        margin-left: 1rem;
    }

    span {
        position: relative;
        top: -10px;
        font-size: .9em;
        color: rgb(186, 38, 38);
    }

    button{
        background-color: #1f3156;
        border: none;
        padding: .6rem;
        font-size: 1.2em;
        color: #fff;
        cursor: pointer;
    }

    button:hover{
        background-color: #192742;
    }
`