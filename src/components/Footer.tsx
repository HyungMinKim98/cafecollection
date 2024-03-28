import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const FooterBar = () => {
  return (
      <footer className="mt-auto py-3 bg-light">
          <Container>
              <Row>
                  <Col className="text-center">
                      <span className="text-muted">© 2024 CafeCollection. All rights reserved.</span>
                  </Col>
              </Row>
          </Container>
      </footer>
  );
};

export default FooterBar;