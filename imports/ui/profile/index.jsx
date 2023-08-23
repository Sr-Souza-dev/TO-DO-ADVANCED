import React, { useEffect, useRef, useState } from "react";
import './index.css';
import { Meteor } from "meteor/meteor";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { InputTextIcon } from "../components/inputs";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ButtonDefault } from "../components/buttons";

export default function  Profile ({user}){

  const [imageUrl, setImageUrl] = useState(user.profile?.image || "images/profile.png"); 
  const [name, setName] = useState(user.profile?.name || "");
  const [lastname, setLastname] = useState(user.profile?.lastname || "");
  const [company, setCompany] = useState(user.profile?.company || "");
  const [email, setEmail] = useState(user.profile?.email || "");
  const [gender, setGender] = useState(user.profile?.gender || "");
  const [birthday, setBirthday] = useState(user.profile?.birthday || "");

  const [hasChanged, setHasChanged] = useState(false);

  const dynamicInoutStyle = {marginTop: '25px', minWidth: '250px', flex: '1'};
  const fileInputRef = useRef(null);

  useEffect(()=> {
    setHasChanged(true);
  }, 
  [imageUrl, name, lastname, company, email, gender, birthday]);

  function onImageChanged(event){
    if(event.target.files && event.target.files[0]){
      //conver base64
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  function onSavedPressed(event){
    event.preventDefault();
    Meteor.call('user.update', name, lastname, company, email, birthday, gender, imageUrl);
    setHasChanged(false);
  }

  return (
    <div>
      <div className="centralize">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onImageChanged}
          style={{ display: 'none' }} // Oculta o input padrão
        />
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <IconButton 
              onClick={()=>fileInputRef.current.click()} 
              style={{padding: '5px', backgroundColor: '#012E40', color: 'white', border: '1px solid white'}}
            >
              <EditIcon />
            </IconButton>
          }
        >
          <Avatar  
            src={imageUrl}
            alt="Imagem de Perfil" 
            style={{margin: 'auto', width: '130px', height: '130px'}}
            />
        </Badge>
      </div>

      <div className="container">
        <h2>Perfil</h2>
        <form onSubmit={onSavedPressed}>
          <div className="row">
            <InputTextIcon 
                value={name} 
                setValue={setName} 
                icon="person" 
                styleInput={{width: '95%'}}
                style={dynamicInoutStyle} 
                label="Nome"
                placeholder="Digite seu Nome aqui"
            />
            <InputTextIcon 
                value={lastname} 
                setValue={setLastname} 
                icon="Signature" 
                styleInput={{width: '95%'}}
                style={dynamicInoutStyle} 
                label="Sobrenome"
                placeholder="Digite seu Sobrenome aqui"
            />
          </div>

          <div className="row">
            <InputTextIcon 
                value={company} 
                setValue={setCompany} 
                icon="apartment" 
                styleInput={{width: '95%'}}
                style={dynamicInoutStyle} 
                label="Empresa"
                placeholder="Empresa em que trabalha"
            />
            <InputTextIcon 
                value={email} 
                setValue={setEmail} 
                icon="mail" 
                styleInput={{width: '95%'}}
                style={dynamicInoutStyle} 
                label="Email"
                placeholder="exemplo@exemplo.com"
            />
          </div>

          <div className="row">
            <InputTextIcon 
              value={birthday} 
              type="date"
              setValue={setBirthday} 
              icon="celebration" 
              styleInput={{width: '95%'}}
              style={dynamicInoutStyle} 
              label="Data de Nascimento"
              placeholder="dd/mm/aaaa"
            />

            <FormControl style={dynamicInoutStyle}>
              <FormLabel id="demo-row-radio-buttons-group-label" style={{color: '#024959'}}>Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
                onChange={(event)=>setGender(event.target.value)}
              >
                <FormControlLabel value="female" control={<Radio />} label="Feminino" style={{color: '#585f60'}}/>
                <FormControlLabel value="male" control={<Radio />} label="Masculino"  style={{color: '#585f60'}}/>
                <FormControlLabel value="other" control={<Radio />} label="Outro"  style={{color: '#585f60'}}/>
              </RadioGroup>
            </FormControl>
          </div>

          <ButtonDefault
            style={{margin: 'auto', marginTop: '25px', width: '80%', ...(!hasChanged && {display:'none'})}}
            text="Salvar"
          />
        </form>
      </div>
    </div>
  );
};
