import * as React from 'react';
import { useState , useEffect  } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

//For mui snackbar alert
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function Categorys() {

    //mui snackbar alert state and functions 
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const [mealCategorys, setMealCategorys] = useState(null);

        useEffect(() => {
            // clean up controller
            let isSubscribed = true;
            axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(function (response) {
                setMealCategorys(response.data.categories)
            })
            .catch(function (error) {
            // handle error
                 setOpen(true);
                 console.log(error);
            })
            .then(function () {
                // always executed
            });
            // cancel subscription to useEffect
            return () => (isSubscribed = false)
        });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Categorys
            </Typography>
            {/* <img src={CategorysLogo} alt="logo"  /> */}
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          {mealCategorys ?
          <Grid container spacing={4}>
            {mealCategorys.map((data,index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '5.25%',
                    }}
                    image={data.strCategoryThumb}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.strCategory}
                    </Typography>
                  </CardContent>
                
                </Card>
              </Grid>
            ))}
          </Grid>
          :
            <Typography variant="h5" gutterBottom component="div">
                  No data to display search other meals
            </Typography>
         }
        </Container>
      </main>
      {/* mui snackbar alert */}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Something went wrong
        </Alert>
      </Snackbar>
    </ThemeProvider>

    
  );
}