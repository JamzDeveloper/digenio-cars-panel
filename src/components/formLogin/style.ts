import style from "styled-components";
export const FormLayout = style.div`

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 40vw;
    
    `;

export const FormContainer = style.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 35rem;
    padding: 2rem;
    width: 25vw;
    background-color: #F7F7F7;
    border-radius: 1rem;
        `;

export const Form = style.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height:40vh;

    `;
export const LabelInput = style.label`
   margin-bottom: 10px;
   font-weight: bold;
   font-size: 1.2rem;
   color: #1F1B2D;
    `;

export const TitleForm = style.h1`
    font-size: 2.5rem;
    font-weight: bold;
    color: #1F1B2D;
    width: 100%;
    text-align: center;
    
    `;
export const ErrorInput = style.span`
    font-weight: 600;  
    color:red;
    margin-top: 10px;
    margin-bottom: -10px;
    `;

export const RecoveryPassword = style.p`
    
    font-weight: 500;
    `;
