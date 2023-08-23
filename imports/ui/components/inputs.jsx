import React from 'react';
import Icon from '@mui/material/Icon';

const InputTextIcon = ({ value, setValue, placeholder, label, icon, style, styleInput, required = true, type = 'text', disabled = false}) => (
    <div style={style}>
        <label className="input-label">{label}</label>
        <div>
            <input 
                style={styleInput}
                className="input-field" 
                type={type} 
                value={value} 
                onChange={e => setValue(e.target.value)} 
                required={required}
                disabled={disabled}
                placeholder={placeholder}
            />
            
            <Icon className='input-icon'>{icon}</Icon>
        </div>
        
    </div>
);

export { InputTextIcon };