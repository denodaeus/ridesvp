import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import TripsCollection from '../../../api/Trips/Trips';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import BlankState from '../../components/BlankState/BlankState';

const StyledTrips = styled.div`
  table tbody tr td {
    vertical-align: middle;
  }
`;

const handleRemove = (documentId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('trips.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Trip deleted!', 'success');
      }
    });
  }
};

const Trips = ({
  loading, trips, match, history,
}) => (!loading ? (
  <StyledTrips>
    <div className="page-header clearfix">
      <h4 className="pull-left">Trips</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Trip</Link>
    </div>
    {trips.length ?
      <Table responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Start Address</th>
            <th>End Address</th>
            <th>Rate</th>
            <th>Seats</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {trips.map(({
            _id, title, createdAt, updatedAt, rate, startLocation, endLocation, numberOfSeats,
          }) => (
            <tr key={_id}>
              <td>{title}</td>
              <td>{startLocation}</td>
              <td>{endLocation}</td>
              <td>{rate}</td>
              <td>{numberOfSeats}</td>
              <td>{timeago(updatedAt)}</td>
              <td>{monthDayYearAtTime(createdAt)}</td>
              <td>
                <Button
                  bsStyle="primary"
                  onClick={() => history.push(`${match.url}/${_id}`)}
                  block
                >
                  View
                </Button>
              </td>
              <td>
                <Button
                  bsStyle="danger"
                  onClick={() => handleRemove(_id)}
                  block
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> : <BlankState
        icon={{ style: 'solid', symbol: 'file-alt' }}
        title="You're plum out of trips, friend!"
        subtitle="Add your first trip by clicking the button below."
        action={{
          style: 'success',
          onClick: () => history.push(`${match.url}/new`),
          label: 'Create Your First Trip',
        }}
      />}
  </StyledTrips>
) : <Loading />);

Trips.propTypes = {
  loading: PropTypes.bool.isRequired,
  trips: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('trips');
  return {
    loading: !subscription.ready(),
    trips: TripsCollection.find().fetch(),
  };
})(Trips);
