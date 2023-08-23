import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InputTextIcon } from '/imports/ui/components/inputs'
import { ButtonDefault } from "../components/buttons";
import { useNavigate } from 'react-router-dom';
import { TasksCollection } from "/imports/api/db/tasksCollection";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Avatar from '@mui/material/Avatar';

const marks = [
    {
      value: 1,
      label: 'Cadastrada',
    },
    {
      value: 2,
      label: 'Andamento',
    },
    {
      value: 3,
      label: 'Concluída',
    },
];

export default function CreateTask({user}){

    const navigate = useNavigate();
    const {id} = useParams();
    const [title, setTitle] = React.useState(id==-1 ? 'Cadastrar Nova Tarefa' : 'Visualizar Tarefa');
    const [edit, setEdit] = React.useState(id==-1 ? true : false);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [status, setStatus] = React.useState(1);
    const [date, setDate] = React.useState(new Date().toLocaleDateString());
    const [type, setType] = React.useState(false);
    const [userd, setUserd] = React.useState({
        name: user?.profile?.name || user?.username || "",
        image: user?.profile?.image || "/images/profile.png"
    });

    const dynamicInoutStyle = {marginTop: '25px', minWidth: '250px', flex: '1'};

    useEffect(() => {
        if(id != -1){
           
            const task = TasksCollection.findOne({_id: id});
            if(task){
                setName(task.title);
                setDescription(task.description);
                setStatus(task.status);
                setDate(task.date);
                setType(task.type);
                setUserd({
                    name: task.user.name,
                    image: task.user.image,
                    id: task.user.id
                });
            }
        }
    },[]);

    function handleSliderChange(event, newValue) {
        if(!edit) return;
        setStatus(last => {
            if(last == 1 && newValue == 3){
                return 2;
            }
            return newValue;
        });
    }

    function handleEdit(){
        setEdit(last => {
            setTitle(last ? 'Visualizar Tarefa' : 'Editar Tarefa');
            return !last;
        })
    }

    function handleSubmmit(e){
        e.preventDefault();
        if(id == -1){
            Meteor.call('tasks.insert', name, description, date, type, status);
            navigate(-1);
        }else{
            Meteor.call('tasks.update', id, name, description, date, type, status);
            navigate(-1);
        }
    }

    return(
        <div className='container'>
            <div className="row">
                <h2>{title}</h2>

                <div className="row" >
                    <h4 style={{marginRight: '20px'}}>{userd.name}</h4>
                    <Avatar alt="foto do usuário dono da tarefa" src={userd.image}/>
                </div>

                {
                    id != -1 && userd.id == user._id &&
                    <FormControlLabel control={<Switch checked={edit} onChange={handleEdit} />} label="Editar" style={{color:"#024959"}}/>
                }
            </div>

            <form onSubmit={handleSubmmit}>
                <div className="row">
                    <InputTextIcon 
                        disabled={!edit}
                        value={name} 
                        setValue={setName} 
                        icon="Title" 
                        styleInput={{width: '95%'}}
                        style={dynamicInoutStyle} 
                        label="Título da Tarefa"
                        placeholder="exemplo: Ir ao mercado"
                    />
                    <InputTextIcon 
                        value={date} 
                        disabled={true}
                        setValue={setDate} 
                        icon="calendar_month" 
                        styleInput={{width: '95%', fontSize: '17px'}}
                        style={dynamicInoutStyle} 
                        label="Ultima Atualização"
                        placeholder="dd/mm/yyyy"
                    />
                </div>

                <TextField
                    id="outlined-multiline-static"
                    label="Descrição"
                    disabled={!edit}
                    style={dynamicInoutStyle}
                    sx={{ width: '98%' }}
                    multiline
                    rows={4}
                    className='input-field-multiline'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    color='primary'
                    placeholder='Digite a descrição da tarefa aqui'
                />

                <div className="row">
                    <Box sx={{ width: '40%', minWidth: 200, margin: '25px 40px 0px 40px'}}>
                        <Slider
                            aria-label="Custom marks"
                            value={status} // Valor do Slider é controlado pelo estado
                            onChange={handleSliderChange} // Função para lidar com a mudança de valor do Slider
                            max={3}
                            min={1}
                            step={1}
                            valueLabelDisplay="off"  
                            marks={marks}
                        />
                    </Box>

                    <FormControlLabel control={<Switch checked={type} onChange={() => edit && setType((last)=>!last)} />} label="Privado" style={{color:"#024959", margin:'auto', marginTop: '25px'}}/>
                </div>

                <ButtonDefault
                    style={{margin: 'auto', marginTop: '25px', width: '50%', ...(!edit && {display:'none'})}}
                    text={id == -1 ? "Cadastrar" : "Salvar"}
                />
            </form>
        </div>
    );
}