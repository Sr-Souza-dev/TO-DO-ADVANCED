import React from 'react';
import { TextTitleDark } from "./texts";
import Icon from '@mui/material/Icon';

const ButtonDefault = ({onClick, style, text, enabled = true, type = 'submit', fontSize = '18px'}) => {
    return (
        <button 
            className="button-default" 
            style={style}
            onClick={onClick}
            disabled={!enabled}
            type={type}
        >
            <TextTitleDark style={{fontSize: fontSize}}>{text}</TextTitleDark>
        </button>
    );
}

const ButtonIcon = ({onClick, style, icon, enabled = true, margin='auto', type = 'submit'}) => {
    return (
        <button 
            className="button-icon" 
            onClick={onClick}
            style={{margin: margin}}
            disabled={!enabled}
            type={type}
        >
            <Icon className='btt-icon'  style={{fontSize: 50, ...style}}>{icon}</Icon>
        </button>
    );
}

export { ButtonDefault, ButtonIcon };