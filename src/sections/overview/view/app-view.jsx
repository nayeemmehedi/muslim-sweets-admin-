import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import { useEffect, useState } from 'react';
import { api } from 'src/api/mainfetch';

// ----------------------------------------------------------------------

export default function AppView() {

  const [product,setproduct]= useState(0)

  const fetchData = async () => {
    try {
      const response = await api.get("/product");
      setproduct(response?.data?.data?.value.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Container  maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Product"
            total={product}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Item Orders Today"
            total={2}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users Login"
            total={10}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Sell Today"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="Most Selling Product Last 7 days"
            chart={{
              labels: [
                '01/01/2024',
                '02/01/2024',
                '03/01/2024',
                '04/01/2024',
                '05/01/2024',
                '06/01/2024',
                '07/01/2024'
               
              ],
              series: [
                {
                  name: 'Sondesh',
                  type: 'line',
                  fill: 'solid',
                  data: [20,32,12,33,26,11,4],
                },
                {
                  name: 'Chomchom',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21],
                },
                {
                  name: 'Doi',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Most selling Sweets"
            chart={{
              series: [
                { label: 'Sondesh', value: 320},
                { label: 'Chomchom', value: 231 },
                { label: 'Doi', value: 210 },
                { label: 'Malai Kari', value: 50 },
              ],
            }}
          />
        </Grid>


        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title=" List Of Sweets"
            subheader="How many (kg) sweets selling yesterday"
            chart={{
              series: [
                { label: 'Doi', value: 370 },
                { label: 'Sondesh-Chini', value: 120 },
                { label: 'ChomChom', value: 200 },
                { label: 'RosoGolla', value: 250 },
                { label: 'Cream-Boom', value: 50 },
                { label: 'KomlaVog', value: 50 },
                { label: 'Roso-Malai', value: 80 },
                { label: 'Sondesh-Ghur', value: 90 },
                { label: 'Kher-ChomChom', value: 20 },
              ],
            }}
          />
        </Grid>

       
      </Grid>
    </Container>
  );
}
