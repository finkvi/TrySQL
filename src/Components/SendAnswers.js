import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { maxTasks } from './tasks';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AnswerItem(key, value) {
    return (
        <div key={key}>
            <ListItem key={key} button >
                <ListItemText primary={'Ответ на задание #' + (key+1)} secondary={value} />
            </ListItem>
            <Divider />
        </div>
    )
}
function AnswersList(props) {
    return (
        <List>
            {props.answers.map((a, i) => {
                return AnswerItem(i, a)
            })}
        </List>
    )
}

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const answers = [];
  for (let i=0; i < maxTasks; i++) {
    answers[i] = localStorage.getItem('answer'+i);
  }        

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    console.log(answers);
    setOpen(false);
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Отправить ответы
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Проверьте ещё раз ответы к заданиям
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSend}>
              Отправить
            </Button>
          </Toolbar>
        </AppBar>
        <AnswersList answers={answers}/>
      </Dialog>
    </div>
  );
}
