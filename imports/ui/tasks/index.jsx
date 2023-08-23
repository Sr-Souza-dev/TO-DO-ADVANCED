import React from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { TasksCollection } from "/imports/api/db/tasksCollection";
import { AlertDecision } from '../components/alerts';
import { useTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Checkbox from '@mui/material/Checkbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListPagination from "../components/listPagination";

export const justCompleted = new ReactiveVar(false);
const textFilter = new ReactiveVar('');
const pageFilter = new ReactiveVar(1);

export default function Tasks(){
  const navigate = useNavigate();
  const [alertDF, setAlertDF] = React.useState(false);
  const [checked, setChecked] = React.useState(justCompleted.get());
  const [text, setText] = React.useState(textFilter.get());

  const [page, setPage] = React.useState(pageFilter.get());
  const pageSize = 4;

  const { tasks, amoutPages } = useTracker(() => {
    const noDataAvailable = { tasks: [], privateTasks: 1 };
    if(!Meteor.user()) return noDataAvailable;

    const handle = Meteor.subscribe('tasks', justCompleted.get(), textFilter.get());
    if(!handle.ready()) return noDataAvailable;

    const filter = { skip: (pageFilter.get()-1)*pageSize, limit: pageSize };

    const tasks = TasksCollection.find({},filter).fetch();
    const amount = TasksCollection.find({}).count();

    return { tasks, amoutPages: Math.ceil(amount / pageSize)};
  }, [justCompleted.get(), textFilter.get(), pageFilter.get()]);

  function handleChecked() {
    justCompleted.set(!checked);
    setChecked(last => !last);
  }

  function handlePageChange(event, value){
    pageFilter.set(value);
    setPage(value);
  }

  function handleCreateTask(){
    navigate('/tasks/-1');
  }

  function handleEditTask(id){
    navigate(`/tasks/${id}`);
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
    <div className="container" style={{minHeight: '500px'}}>
      <div className="row">
        <h2>Lista de Tarefas</h2>

        <Paper
          component="form"
          sx={{ p: '1px 4px', margin: '10px 0px 10px 20px', display: 'flex', alignItems: 'center', minWidth: 300, flexGrow: {xs: 1, sm: 0.8, md: 0.8}}}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={text}
            onChange={(e) => {
              textFilter.set(e.target.value);
              setText(e.target.value);
            }}
            placeholder="Buscar Tarefa"
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Checkbox color="primary" checked={checked} onChange={handleChecked}/>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleCreateTask}>
            <AddCircleIcon />
          </IconButton>
        </Paper>

 
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
