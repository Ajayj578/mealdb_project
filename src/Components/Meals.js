import * as React from 'react';
import { useState , useEffect  } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Image from '../Assets/Images/sample.jpeg'; 
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import YtLogo from '../Assets/icons/youtube.png';
import webLogo from '../Assets/icons/website.png';
import NationalityLogo from '../Assets/icons/international-food.png'
import Slide from '@mui/material/Slide';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const data = [];

function Media(props) {
  const { loading = false } = props;

  return (
    <Grid container wrap="nowrap">
      {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          {item ? (
            <img
              style={{ width: 210, height: 118 }}
              alt={item.title}
              src={item.src}
            />
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}

          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="body2">
                {item.title}
              </Typography>
              <Typography display="block" variant="caption" color="text.secondary">
                {item.channel}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`${item.views} • ${item.createdAt}`}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

var drawerMealData; 

  const sectionStyle = {
    height: "70vh",
    width:"auto",
    backgroundImage:`url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    
  };

const theme = createTheme();

export default function Meals() {
  //snackbar alert state and functions
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  //state variables for meal components
    const [mealName, setMealName] = useState(null);
    const [cards, setCards] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [drawerMealName, setDrawerMealName] = useState();
    const [drawerMealTags, setDrawerMealTags] = useState();
    const [drawerMealCategory, setDrawerMealCategory] = useState();
    const [drawerMealInstructions, setDrawerMealInstructions] = useState();
    const [drawerMealIngredients, setDrawerMealIngredients] = useState(['Initial value']);
    const [drawerMealSourceYt, setDrawerMealSourceYt] = useState();
    const [drawerMealSourceWeb, setDrawerMealSourceWeb] = useState(); 
    const [drawerMealNationality, setDrawerMealNationality] = useState();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleIconClicks = meal => () => {
        axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s='+meal)
        .then(function (response) {
            setCards(response.data.meals)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            setOpenAlert(true);
        })
        .then(function () {
            // always executed
        });
    }
    const handleViewMoreClick = mealId => () => {
      handleClickOpen()
      axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+mealId)
      .then(function (response) {
          // handle success
          drawerMealData = response.data.meals[0]
          //code for combaining strIngredient together
          const Ingredients = []
            for(let i=1; i<=20; i++){
              if(drawerMealData[`strIngredient${i}`]){
                Ingredients.push(`${drawerMealData[`strIngredient${i}`]} - ${drawerMealData[`strMeasure${i}`]}`)
              }
              else{
                break
              }
            }
          setDrawerMealIngredients(Ingredients)
          setDrawerMealName(response.data.meals[0].strMeal) 
          setDrawerMealInstructions(response.data.meals[0].strInstructions)
          setDrawerMealSourceYt(response.data.meals[0].strYoutube)
          setDrawerMealSourceWeb(response.data.meals[0].strSource)
          setDrawerMealNationality(response.data.meals[0].strArea) 
          setDrawerMealTags(response.data.meals[0].strTags) 
          setDrawerMealCategory(response.data.meals[0].strCategory)
      })
      .catch(function (error) {
          // handle error
          setOpenAlert(true);
          console.log(error);
      })
      .then(function () {
          // always executed
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box style={sectionStyle}
          sx={{
            bgcolor: 'background.paper',
            pt: 6,
            pb: 6,
            backgroundImage: `url(${Image})`,
            width:'100%',
            height:'auto'
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="white"
              gutterBottom
            >
              For The Love Of Food
            </Typography>
            <Typography variant="h5" align="center" color="white" paragraph>
            “Food for us comes from our relatives, whether they have wings or fins or roots. That is how we consider food. Food has a culture. It has a history. It has a story. It has relationships.”
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" component={Link} to={'/Categorys'} >View all Category</Button>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                > 
                
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        
                        placeholder="search your favorate meal example: chicken"
                        inputProps={{ 'aria-label': 'search your favorate meal' ,color:'black'}}
                        onChange={event=>{                                 //adding the onChange event
                            setMealName(event.target.value)
                          }}
                    />
                    <IconButton onClick={handleIconClicks(mealName)} sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon style={{color:'blue'}}/>
                    </IconButton>
                </Paper>
            </Stack>



          </Container>
        </Box>
        {cards ?
        <Container sx={{ py: 10 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((cards,index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', width:'100%',display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '0.25%',
                      
                    }}
                    image={cards.strMealThumb}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {cards.strMeal}
                    </Typography>
                    <Typography>
                      This is a {cards.strArea} {cards.strCategory} Dish. 
                    </Typography>
                    <br></br>
                    <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                
                        <Grid item xs={6} md={2}>
                        <img src={YtLogo} alt="logo"  />
                        </Grid>
                        <Grid item xs={6} md={10}>
                        
                        <a href={cards.strYoutube} target="_blank">
                        {cards.strYoutube}
                        </a>
                        </Grid>
                    </Grid>
                    </Box>
                  </CardContent>
                  <CardActions>
                   
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Divider />
                        <Grid item xs={12}>
                          <Button  size="small" onClick={handleViewMoreClick(cards.idMeal)}>View More Info</Button>
                        </Grid>
                  
                      </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        :
          <Container>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                    <Box sx={{ overflow: 'hidden' }}>
                    <Media loading />
                    <Media loading/>
                    
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ overflow: 'hidden' }}>
                    <Media loading />
                    <Media loading/>
                    </Box>
                  </Grid>
              
                </Grid>
                <Typography variant="h5" gutterBottom component="div">
                  No data to display search other meals
                </Typography>
                </Container>
                }
             </main>

  
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }} >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {drawerMealName} 
              </Typography>
            </Toolbar>
          </AppBar>
          <Divider />
            <br/>

          <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
          <Grid item xs={6}>
          <Card sx={{ minWidth: 275 ,maxHeight:170}}>
          <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {drawerMealName}
          </Typography>
          <br/>
          <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                  
                          <Grid item xs={6} md={2}>
                          <img src={NationalityLogo} alt="logo"  />
                          </Grid>
                          <Grid item xs={6} md={10}>
                          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                          {drawerMealNationality}
                          </Typography>
                          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                          Tags : {drawerMealTags}
                          </Typography>
                          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                          Category : {drawerMealCategory}
                          </Typography>
                          {/* <a href={cards[index].strYoutube} target="_blank">
                          {cards[index].strYoutube}
                          </a> */}
                          </Grid>
                      </Grid>
                      </Box>
            
            </CardContent>
             <CardActions>
            </CardActions>
            </Card>
          </Grid>

          <Grid item xs={6}>
          <Card  sx={{ minWidth: 275 ,maxHeight:170}}>
         <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            More Reference
          </Typography>
        
          <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                  
                          <Grid item xs={6} md={2}>
                          <img src={YtLogo} alt="logo"  />
                          </Grid>
                          <Grid item xs={6} md={10}>
                          <a href={drawerMealSourceYt} target="_blank">
                          {drawerMealSourceYt}
                          </a>
                          {/* <a href={cards[index].strYoutube} target="_blank">
                          {cards[index].strYoutube}
                          </a> */}
                          </Grid>
                      </Grid>
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                  
                          <Grid item xs={6} md={2}>
                          <img src={webLogo} alt="logo"  />
                          </Grid>
                          <Grid item xs={6} md={10}>
                          <a href={drawerMealSourceWeb} target="_blank">
                          {drawerMealSourceWeb}
                          </a>
                          {/* <a href={cards[index].strYoutube} target="_blank">
                          {cards[index].strYoutube}
                          </a> */}
                          </Grid>
                      </Grid>
                      </Box>
        
        </CardContent>
        <CardActions>
      
        </CardActions>
      </Card>
          </Grid>
        </Grid>
      </Box>



    <Accordion style={{backgroundColor: "#bdbdbd"}}  expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Ingredients
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Click here for dish Ingredients</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List style={{backgroundColor: "#bdbdbd"}} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {drawerMealIngredients.map((drawerMealIngredient,index) => (
            <ListItem>
        
            <ListItemText primary={drawerMealIngredients[index]}/>
            </ListItem>
          ))}
      
        </List>
        </AccordionDetails>
      </Accordion>



    <Box sx={{ flexGrow: 1 }} style={{color:'#BBDEFB'}}>
    <Card style={{backgroundColor: "#f5f5f5"}} sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          cooking instructions for
        </Typography>
        <Typography variant="h5" component="div">
        {drawerMealName} 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Step by step instructions
        </Typography>
        <Typography variant="body2">
          {drawerMealInstructions}
          <br />
          
        </Typography>
        <br></br>
        <Typography>
          {'"Happy Cooking"'}
        </Typography>
      </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
    </Box>
      </Dialog>


      <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          Something went wrong
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}