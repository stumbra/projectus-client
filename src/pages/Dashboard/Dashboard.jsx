import React from 'react';
import { motion } from 'framer-motion';
import { GET_ASSIGNED_TICKETS_QUERY } from './gql';
import { useQuery } from '@apollo/client';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Chart, Footer } from '../../components';
import { sort } from '../../utils/utilities';
import NewestEvents from './NewestEvents/NewestEvents';
import { Container, InnerWrapper } from './Dashboard.styled';

export const COLORS = [
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7',
  '#7f8c8d',
  '#e74c3c',
  '#2ecc71',
  '#9b59b6',
  '#34495e',
];

const Dashboard = () => {
  const { loading, data: { getAssignedTickets } = {} } = useQuery(GET_ASSIGNED_TICKETS_QUERY);

  const priorityData = [
    {
      name: 'None',
      amount: 0,
      fill: COLORS[0],
    },
    {
      name: 'Low',
      amount: 0,
      fill: COLORS[1],
    },
    {
      name: 'Medium',
      amount: 0,
      fill: COLORS[2],
    },
    {
      name: 'High',
      amount: 0,
      fill: COLORS[3],
    },
  ];

  const typeData = [
    {
      name: 'Feature',
      amount: 0,
      fill: COLORS[0],
    },
    {
      name: 'Improvement',
      amount: 0,
      fill: COLORS[1],
    },
    {
      name: 'Maintenance',
      amount: 0,
      fill: COLORS[2],
    },
    {
      name: 'Request',
      amount: 0,
      fill: COLORS[3],
    },
    {
      name: 'Service',
      amount: 0,
      fill: COLORS[4],
    },
    {
      name: 'Bug',
      amount: 0,
      fill: COLORS[5],
    },
  ];

  const statusData = [];

  const eventData = [];

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="massive">Loading...</Loader>
      </Dimmer>
    );

  priorityData.forEach((item) => {
    const count = getAssignedTickets.filter(
      (ticket) => ticket.priority.toLowerCase() === item.name.toLowerCase()
    ).length;
    item.amount += count;
  });

  typeData.forEach((item) => {
    const count = getAssignedTickets.filter(
      (ticket) => ticket.type.toLowerCase() === item.name.toLowerCase()
    ).length;
    item.amount += count;
  });

  getAssignedTickets.forEach((item) => {
    if (statusData.length < 1) {
      statusData.push({ name: item.section.title, amount: 1, fill: COLORS[0] });
    } else {
      const alreadyExists = statusData.findIndex(
        (data) => item.section.title.toLowerCase() === data?.name.toLowerCase()
      );

      alreadyExists > -1
        ? (statusData[alreadyExists].amount += 1)
        : statusData.push({
            name: item.section.title,
            amount: 1,
            fill: COLORS[statusData.length],
          });
    }
  });

  [...getAssignedTickets].reverse().forEach((event) => {
    eventData.push(...event.history);
  });

  return (
    <Container>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <InnerWrapper>
          <Chart
            title="Ticket by Priority"
            data={priorityData}
            type="Bar"
            dataKeys={{ x: 'name', y: 'amount' }}
          />
          <Chart
            title="Ticket by Type"
            data={typeData}
            type="Bar"
            dataKeys={{ x: 'name', y: 'amount' }}
          />
          <Chart
            title="Ticket by Status"
            data={sort(statusData, 'name')}
            type="Pie"
            dataKeys={{ x: 'name', y: 'amount' }}
          />
          <NewestEvents title="Newest Events" events={eventData} />
        </InnerWrapper>
      </motion.div>
      <Footer />
    </Container>
  );
};

export default Dashboard;
