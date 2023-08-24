import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { justCompleted } from "../tasks";
import { TasksCollection} from '/imports/api/db/tasksCollection';
import { ReactiveVar } from 'meteor/reactive-var';
import { useNavigate } from "react-router-dom";
import ListPagination from "../components/listPagination";
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import "./index.css";

const pageFilter = new ReactiveVar(1);

export default function Home ({user}){
  const navigate = useNavigate();

  const [alertDF, setAlertDF] = React.useState(false);
  const [status, setStatus] = React.useState(justCompleted.get());
  const [page, setPage] = React.useState(pageFilter.get());
  const pageSize = 2;

  const {tasks, amoutPages, total, registered, pending, done} = useTracker(() => {
    const noDataAvailable = {tasks:[], amoutPages:0, total: 0, registered: 0, pending: 0, done: 0};

    if(!Meteor.user()) return noDataAvailable;
    const handle = Meteor.subscribe('tasks', justCompleted.get(), "");
    if(!handle.ready()) return noDataAvailable;

    const filter = {'user.id': user._id};
    const total = TasksCollection.find(filter).count();
    const registered = TasksCollection.find({status: 1, ...filter}).count();
    const pending = TasksCollection.find({status: 2, ...filter}).count();
    const done = TasksCollection.find({status: 3, ...filter}).count();
    
    const pagination = { skip: (pageFilter.get()-1)*pageSize, limit: pageSize };
    const tasks = TasksCollection.find(filter, pagination).fetch();

    return {tasks, total, registered, pending, done, amoutPages: Math.ceil(total/pageSize)};
  }, [justCompleted.get(), pageFilter.get()]);

  function handlePageChange(event, value){
    pageFilter.set(value);
    setPage(value);
  }

  function handleStatus(){
    justCompleted.set(!status);
    setStatus(last => !last);
  }

  function handleEditTask(id){
    navigate(`/tasks/${id}`);
  }

  function handleCreateTask(){
    navigate('/tasks/-1');
  }

  function handleDeleteTask(id){

    setAlertDF({
      title: "Excluir Tarefa",
      content: "Deseja realmente excluir esta tarefa?",
      error: false,
      onConfirm: () => {
          setAlertDF(false);
          Meteor.call('tasks.remove', id);
      }
    });
  }

  return (
    <div className="container" style={{minHeight:'550px'}}>
      <div className="row">
        <Avatar
          alt="Remy Sharp"
          src={user?.profile?.image || "/images/profile.png"}
          sx={{ width: 200, height: 200, margin: 'auto'}}
        />

        <div style={{margin: 'auto', display:'flex', flexDirection: 'column'}}>
          <h2 style={{alignSelf: 'center', marginBottom:'0px'}}> Bem Vindo {(user?.profile?.name || user?.username ) + " " + (user?.profile?.lastname || " ")}</h2>
          <h4 style={{alignSelf: 'center', marginTop:'0px'}}>Você está logado como {user?.username}!</h4>
          <div className='row'>
            <FormControlLabel control={<Switch checked={status} onChange={handleStatus} />} label="Concluidas" style={{color:"#024959"}}/>
            <IconButton color="primary" sx={{ p: '10px', fontSize:'17px'}} aria-label="directions" onClick={handleCreateTask}>
              <AddCircleIcon /> Nova Tarefa
            </IconButton>
          </div>
        </div>
      </div>

      <div className="row">
        {!status &&
          <>
            <div className="card-status">
              <h4>Total</h4>
              <h2>{total}</h2>
            </div>
            <div className="card-status">
              <h4>Cadastradas</h4>
              <h2>{registered}</h2>
            </div>
            <div className="card-status">
              <h4>Pendentes</h4>
              <h2>{pending}</h2>
            </div>
          </>
        }
        {status &&
          <div className="card-status">
            <h4>Concluidas</h4>
            <h2>{done}</h2>
          </div>
        }
      </div>

      <ListPagination tasks={tasks} amoutPages={amoutPages} page={page} setPage={setPage} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} handlePageChange={handlePageChange}/>

      {alertDF   && 
        <div className="full-page">
          <AlertDecision 
              title={alertDF.title} 
              content={alertDF.content} 
              onCancel={() => setAlertDF(false)} 
              onConfirm={alertDF.onConfirm}
              error={alertDF.error}
          />
        </div>
      }
    </div>
  );
};
