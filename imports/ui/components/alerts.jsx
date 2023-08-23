import React from 'react';
import './styles.module.css';
import { ButtonDefault, ButtonIcon } from './buttons';


const DefaultBg = ({onclick}) => (
    <button className="default-bg" onClick={onclick}></button>
);

const AlertDecision = ({title, content, onConfirm, onCancel, error = false}) => (
    <>
        <DefaultBg onclick={onCancel} />
        <div className="default-card-alert">
            <div className="row">
                <h2>{title}</h2>
                <ButtonIcon icon="close" onClick={onCancel} style={{fontSize: '28px'}} margin=' 0 0 0 20px'/>
            </div>
            <p>{content}</p>
            {!error &&
                <ButtonDefault text="Confirmar" style={{margin: '20px auto 5px auto', width: '70%'}} onClick={onConfirm} />
            }
        </div>
    </>
);

export {AlertDecision};