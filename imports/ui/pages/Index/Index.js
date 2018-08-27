import React from 'react';
import { Row, Col, Image, Panel, Button } from 'react-bootstrap';
import styled from 'styled-components';
// import { lighten, darken } from 'polished';
import RideListing from '../../components/Ride/RideListing';
import RideListingFilter from '../../components/Ride/RideListingFilter';

const StyledIndex = styled.div`
`;

const StyledAd = styled.div`
  img {
    max-width: 220px;
  }

  .padding-0 {
    padding-right: 0;
    padding-left: 0;
  }
`;

const Index = () => (
  <StyledIndex>
    <Row className="show-grid">
      <Col md={2}>
        <StyledAd>
          <Image src="/mcd-skyscraper.jpg" />
        </StyledAd>
        <div>Google Ads</div>
      </Col>
      <Col md={10}>
        <Row className="show-grid">
          <Col md={12}>
            <Panel>
              <Panel.Heading>
                <strong>Booking a ride is as easy as RideSVP</strong>
              </Panel.Heading>
              <Panel.Body>
                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.  Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
                </p>
                <p>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
                </p>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={8} md={3} className="padding-0">
            <RideListingFilter
              from={['Los Angeles', 'San Francisco']}
              to={['San Francisco', 'Los Angeles']}
              date={['8/27/2018', '8/28/2018', '8/29/2018']}
            />
          </Col>
          <Col xs={8} md={9} className="padding-0">
            <RideListing
              image="/female-avatar-maker.jpg"
              name="Penelope Cruzado"
              age="27"
              car="Honda Civic"
              date="9/2/2018"
              price="$45.00"
              time="9:00 AM PDT"
              city="Los Angeles"
            />
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={3}>
            <Panel>
              <Panel.Body>
                <Panel.Title componentClass="h1">Driving Somewhere? Register your trip!</Panel.Title>
                <br />
                <br />
                <br />
                <br />
                <br />
                <Button>Here</Button>
              </Panel.Body>
            </Panel>
          </Col>
          <Col xs={12} md={9}>
            <RideListing
              image="/male-avatar-maker.jpg"
              name="Fernando Boulevarde"
              age="43"
              car="Nissan Leaf"
              date="9/16/2018"
              price="$32.00"
              time="6:00 PM PDT"
              city="San Francisco"
            />
          </Col>
        </Row>
      </Col>
      {/* <Col md={2}>
        <div>Ad</div>
      </Col> */}
    </Row>
  </StyledIndex>
);

export default Index;
