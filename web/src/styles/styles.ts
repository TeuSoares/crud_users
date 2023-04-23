import styled, { css } from "styled-components";

interface MessageProps {
    status: string;
}

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const Message = styled.div`
    width: 100%;
    margin-bottom: 1.4rem;
    padding: 1rem .7rem;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    font-size: .9em;

    ${({status}: MessageProps) => status == "success" ?
        css`
            background-color: rgba(72, 186, 38);
            border: 1px solid #48ba2633;
        ` 
    : 
        css`
            background-color: rgb(186, 38, 38);
            border: 1px solid #ba2626;
        `};
`