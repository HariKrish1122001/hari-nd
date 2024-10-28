import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { FaCouch, FaChartBar, FaStore, FaUserPlus } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const cards = [
  // {
  //   icon: <FaCouch size={24} color="white" />,
  //   title: 'Bookings',
  //   value: '0',
  //   change: '+55% than last week',
  //   color: '#2d2e32',
  // },
  {
    icon: <FaChartBar size={24} color="white" />,
    title: "Today's Users",
    value: '20',
    change: '+3% than last month',
    color: '#3b82f6',
  },
  {
    icon: <FaStore size={24} color="white" />,
    title: 'Revenue',
    value: '12',
    change: '1month ',
    color: '#22c55e',
  },
  {
    icon: <FaUserPlus size={24} color="white" />,
    title: 'Followers',
    value: '10',
    change: 'Just updated',
    color: '#ec4899',
  },
];
const websiteViewsData = {
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  datasets: [
    {
      label: 'Views',
      data: [60, 10, 30, 20, 50, 25, 40],
      backgroundColor: 'rgba(33, 150, 243, 0.6)',
    },
  ],
};
const lineChartData = {
  labels: ['Apr', 'Jun', 'Aug', 'Oct', 'Dec'],
  datasets: [
    {
      label: 'Sales / Tasks',
      data: [100, 200, 300, 250, 400],
      borderColor: '#fff',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      tension: 0.4,
    },
  ],
};
const Dashboard = () => {
  return (
    <div style={styles.dashboard}>
      <div style={styles.cardContainer}>
        {cards.map((card, index) => (
          <div key={index} style={styles.card}>
            <div style={{ ...styles.icon, backgroundColor: card.color }}>
              {card.icon}
            </div>
            <div style={styles.title}>{card.title}</div>
            <div style={styles.value}>{card.value}</div>
            <div style={styles.change}>{card.change}</div>
          </div>
        ))}
      </div>
      <Box sx={{ padding: 4, display: 'flex', gap: 4 }}>
        <Card sx={{ backgroundColor: 'purple', color: '#fff', flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Website Views
            </Typography>
            <Bar data={websiteViewsData} />
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: 'orange', color: '#fff', flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Daily Sales
            </Typography>
            <Line data={lineChartData} />
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: 'darkblue', color: '#fff', flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Completed Tasks
            </Typography>
            <Line data={lineChartData} />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};
const styles = {
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
  },
  cardContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '200px',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  title: {
    fontSize: '18px',
    color: '#6b7280',
  },
  value: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '5px 0',
    color: '#111827',
  },
  change: {
    fontSize: '14px',
    color: '#10b981',
  },
};
export default Dashboard;