import React from 'react';
import { motion } from 'framer-motion';
import { GET_ASSIGNED_TICKETS_QUERY } from './gql';
import { useQuery } from '@apollo/client';
import { Breadcrumb, Dimmer, Loader } from 'semantic-ui-react';
import { Chart, Empty } from '../../components';
import NewestEvents from './NewestEvents/NewestEvents';
import { Container, InnerWrapper } from './Dashboard.styled';
import { COLORS } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { loading, data: { getAssignedTickets } = [] } = useQuery(GET_ASSIGNED_TICKETS_QUERY);

  const [switcher, setSwitcher] = React.useState('today');

  const { i18n, t } = useTranslation('common');

  const priorityData = [
    {
      [i18n.language === 'en' ? 'name' : 'pavadinimas']: t('common.priorities.none'),
      [i18n.language === 'en' ? 'amount' : 'kiekis']: 0,
      fill: COLORS[0],
    },
    {
      [i18n.language === 'en' ? 'name' : 'pavadinimas']: t('common.priorities.low'),
      [i18n.language === 'en' ? 'amount' : 'kiekis']: 0,
      fill: COLORS[1],
    },
    {
      [i18n.language === 'en' ? 'name' : 'pavadinimas']: t('common.priorities.medium'),
      [i18n.language === 'en' ? 'amount' : 'kiekis']: 0,
      fill: COLORS[2],
    },
    {
      [i18n.language === 'en' ? 'name' : 'pavadinimas']: t('common.priorities.high'),
      [i18n.language === 'en' ? 'amount' : 'kiekis']: 0,
      fill: COLORS[3],
    },
  ];

  const typeData = [
    {
      [i18n.language === 'en' ? 'name' : 'pavadinimas']: t('common.types.feature'),
      [i18n.language === 'en' ? 'amount' : 'kiekis']: 0,
      fill: COLORS[0],
    },
    {
      [i18n.language === 'en' ? 'name' : 'pavadinimas']: t('common.types.improvement'),
      [i18n.language === 'en' ? 'amount' : 'kiekis']: 0,
      fill: COLORS[1],
    },
    {
      [i18n.language === 'en' ? 'name' : 'pavadinimas']: t('common.types.maintenance'),
      [i18n.language === 'en' ? 'amount' : 'kiekis']: 0,
      fill: COLORS[2],
    },
    {
      [i18n.language === 'en' ? 'name' : 'pavadinimas']: t('common.types.request'),
      [i18n.language === 'en' ? 'amount' : 'kiekis']: 0,
      fill: COLORS[3],
    },
    {
      [i18n.language === 'en' ? 'name' : 'pavadinimas']: t('common.types.service'),
      [i18n.language === 'en' ? 'amount' : 'kiekis']: 0,
      fill: COLORS[4],
    },
    {
      [i18n.language === 'en' ? 'name' : 'pavadinimas']: t('common.types.bug'),
      [i18n.language === 'en' ? 'amount' : 'kiekis']: 0,
      fill: COLORS[5],
    },
  ];

  const statusData = [];

  const eventData = [];

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="massive">{t('common.loading')}</Loader>
      </Dimmer>
    );

  const reorganizeTickets = () => {
    switch (switcher) {
      case 'today': {
        return getAssignedTickets.filter(
          (ticket) =>
            new Date(ticket.deadline).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
        );
      }
      case 'tomorrow': {
        return getAssignedTickets.filter((ticket) => {
          const today = new Date();
          const tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 1);
          return new Date(ticket.deadline).setHours(0, 0, 0, 0) === tomorrow.setHours(0, 0, 0, 0);
        });
      }
      case 'week': {
        return getAssignedTickets.filter((ticket) => {
          const today = new Date();
          const first = today.getDate() - today.getDay();
          const last = first + 6;

          const firstday = new Date(today.setDate(first)).setHours(0, 0, 0, 0);
          const lastday = new Date(today.setDate(last)).setHours(0, 0, 0, 0);

          return (
            new Date(ticket.deadline).setHours(0, 0, 0, 0) >= firstday &&
            new Date(ticket.deadline).setHours(0, 0, 0, 0) <= lastday
          );
        });
      }
      case 'month': {
        return getAssignedTickets.filter((ticket) => {
          const today = new Date();
          const firstday = new Date(today.getFullYear(), today.getMonth(), 1).setHours(0, 0, 0, 0);
          const lastday = new Date(today.getFullYear(), today.getMonth() + 1, 0).setHours(
            0,
            0,
            0,
            0
          );

          return (
            new Date(ticket.deadline).setHours(0, 0, 0, 0) >= firstday &&
            new Date(ticket.deadline).setHours(0, 0, 0, 0) <= lastday
          );
        });
      }
    }
  };

  if (getAssignedTickets) {
    priorityData.forEach((item) => {
      const count = reorganizeTickets().filter((ticket) => {
        switch (ticket.priority) {
          case 'NONE': {
            return (
              t('common.priorities.none').toLowerCase() ===
              item[i18n.language === 'en' ? 'name' : 'pavadinimas'].toLowerCase()
            );
          }
          case 'LOW': {
            return (
              t('common.priorities.low').toLowerCase() ===
              item[i18n.language === 'en' ? 'name' : 'pavadinimas'].toLowerCase()
            );
          }
          case 'MEDIUM': {
            return (
              t('common.priorities.medium').toLowerCase() ===
              item[i18n.language === 'en' ? 'name' : 'pavadinimas'].toLowerCase()
            );
          }
          case 'HIGH': {
            return (
              t('common.priorities.high').toLowerCase() ===
              item[i18n.language === 'en' ? 'name' : 'pavadinimas'].toLowerCase()
            );
          }
        }
      }).length;
      item[i18n.language === 'en' ? 'amount' : 'kiekis'] += count;
    });

    typeData.forEach((item) => {
      const count = reorganizeTickets().filter((ticket) => {
        switch (ticket.type) {
          case 'FEATURE': {
            return (
              t('common.types.feature').toLowerCase() ===
              item[i18n.language === 'en' ? 'name' : 'pavadinimas'].toLowerCase()
            );
          }
          case 'IMPROVEMENT': {
            return (
              t('common.types.improvement').toLowerCase() ===
              item[i18n.language === 'en' ? 'name' : 'pavadinimas'].toLowerCase()
            );
          }
          case 'MAINTENANCE': {
            return (
              t('common.types.maintenance').toLowerCase() ===
              item[i18n.language === 'en' ? 'name' : 'pavadinimas'].toLowerCase()
            );
          }
          case 'REQUEST': {
            return (
              t('common.types.request').toLowerCase() ===
              item[i18n.language === 'en' ? 'name' : 'pavadinimas'].toLowerCase()
            );
          }
          case 'SERVICE': {
            return (
              t('common.types.service').toLowerCase() ===
              item[i18n.language === 'en' ? 'name' : 'pavadinimas'].toLowerCase()
            );
          }
          case 'BUG': {
            return (
              t('common.types.bug').toLowerCase() ===
              item[i18n.language === 'en' ? 'name' : 'pavadinimas'].toLowerCase()
            );
          }
        }
      }).length;
      item[i18n.language === 'en' ? 'amount' : 'kiekis'] += count;
    });

    reorganizeTickets().forEach((item) => {
      if (statusData.length < 1) {
        statusData.push({
          name: item.section.title,
          amount: 1,
          fill: COLORS[0],
        });
      } else {
        const alreadyExists = statusData.findIndex(
          (data) => item.section.title.toLowerCase() === data.name.toLowerCase()
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

    [...reorganizeTickets()].reverse().forEach((event) => {
      eventData.push(...event.history);
    });
  }

  return (
    <Container>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            marginTop: '1rem',
          }}
        >
          <Breadcrumb size="massive">
            <Breadcrumb.Section
              active={switcher === 'today'}
              onClick={() => {
                setSwitcher('today');
              }}
            >
              {t('dashboard.switcher.today')}
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section
              active={switcher === 'tomorrow'}
              onClick={() => {
                setSwitcher('tomorrow');
              }}
            >
              {t('dashboard.switcher.tomorrow')}
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section
              active={switcher === 'week'}
              onClick={() => {
                setSwitcher('week');
              }}
            >
              {t('dashboard.switcher.thisWeek')}
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section
              active={switcher === 'month'}
              onClick={() => {
                setSwitcher('month');
              }}
            >
              {t('dashboard.switcher.thisMonth')}
            </Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <InnerWrapper>
          {getAssignedTickets.length > 0 ? (
            <React.Fragment>
              <Chart
                title={t('dashboard.graphs.ticketsByPriority')}
                data={priorityData}
                type="Bar"
                dataKeys={{
                  x: i18n.language === 'en' ? 'name' : 'pavadinimas',
                  y: i18n.language === 'en' ? 'amount' : 'kiekis',
                }}
              />
              <Chart
                title={t('dashboard.graphs.ticketsByType')}
                data={typeData}
                type="Bar"
                dataKeys={{
                  x: i18n.language === 'en' ? 'name' : 'pavadinimas',
                  y: i18n.language === 'en' ? 'amount' : 'kiekis',
                }}
              />
              <Chart title={t('dashboard.graphs.ticketsByStatus')} data={statusData} type="Pie" />
              <NewestEvents title={t('dashboard.events.title')} events={eventData} />
            </React.Fragment>
          ) : (
            <Empty
              header="No data to be displayed"
              subheader="Create a ticket or be assigned to one"
            />
          )}
        </InnerWrapper>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
