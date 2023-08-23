import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import "./styles.module.css";

export default function ListPagination({tasks, amoutPages, page, setPage, handleEditTask, handleDeleteTask, handlePageChange}){

    return (
        <>
            <List sx={{ width: '100%', minWidth: '200px', bgcolor: 'background.paper', margin: '0px', padding: '0px', marginBottom: '10px'}}>
            {tasks.map((task, index) => (
            <div key={index}>
                <ListItem alignItems="flex-start"
                sx={{minWidth: '350px',margin: '0px', padding: '0px'}}
                secondaryAction={
                    task.user.id == Meteor.userId() && (
                    <IconButton edge="end" aria-label="delete" color="secondary" onClick={()=>handleDeleteTask(task._id)}>
                        <DeleteIcon />
                    </IconButton>
                    )
                }
                >
                <ListItemButton onClick={() => handleEditTask(task._id)}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={task.user.image} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={task.title}
                        secondary={
                        <React.Fragment>
                            <Typography
                            sx={{ display: 'inline', marginRight: '10px'}}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            >
                            {task.user.name}
                            </Typography>
                        {task.status == 1 ? "Cadastrada" : task.status == 2 ? "Em andamento" : "Concluída"}
                        </React.Fragment>
                        }
                    />
                    {task.type && task.user.id == Meteor.userId() && (
                        <h5 className="private-text">Privado</h5>
                    )}
                </ListItemButton>


                </ListItem>
                <Divider variant="inset" component="li" />
            </div>
            ))}
        </List>

        <Pagination 
            count={amoutPages} 
            color="primary" 
            page={page}
            onChange={handlePageChange}
            sx={{
                marginTop: 'auto',
                alignSelf: 'center',
            }}
        />
    </>
);}