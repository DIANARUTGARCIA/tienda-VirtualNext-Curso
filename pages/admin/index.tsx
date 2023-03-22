import useSWR from 'swr'
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  DashboardOutlined,
  GroupAddOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SummaryTitle from '../../components/admin/SummaryTitle'
import { AdminLayout } from '../../components/layouts'
import { DashboardSummaryResponse } from '../../interfaces'

const DasboardPage = () => {

 const { data,error} = useSWR<DashboardSummaryResponse>('/api/admin/dashboard',{
  refreshInterval: 30 * 100
 })
 
 const [refreshIn, setRefreshIn] = useState(30);

 useEffect(() => {
   const interval = setInterval(()=>{
    setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn -1 : 30);
   },1000)
 
   return () => clearInterval(interval)
 }, [])
 

 if(!error && !data){
    return <></>
 }
 if(error){
  console.log(error)
  return <Typography>Error al cargar la infomación</Typography>
 }

 const {
  numberOfOrders,           
    paidOrders,             
    numberOfClients,        
    numberOfProducts,       
    productsWithNoInventory,
    lowInventory,           
    notPaidOrders,          
  } = data!;

  return (
    <AdminLayout
      title={'Panel de administración'}
      subTitle={'Estadisticas generales'}
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTitle
          title={numberOfOrders}
          subTitle={'Ordenes Totales'}
          icon={
            <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />
          }
        />
        <SummaryTitle
          title={paidOrders}
          subTitle={'Ordenes Pagadas'}
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />

        <SummaryTitle
          title={notPaidOrders}
          subTitle={'Ordenes Pedientes'}
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
        />

        <SummaryTitle
          title={numberOfClients}
          subTitle={'Clientes'}
          icon={<GroupAddOutlined color="primary" sx={{ fontSize: 40 }} />}
        />

        <SummaryTitle
          title={numberOfProducts}
          subTitle={'Productos'}
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />

        <SummaryTitle
          title={productsWithNoInventory}
          subTitle={'Sin Existencias'}
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTitle
          title={lowInventory}
          subTitle={'Bajo Inventario'}
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />

        <SummaryTitle
          title={refreshIn}
          subTitle={'Actualización es:'}
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  )
}

export default DasboardPage
