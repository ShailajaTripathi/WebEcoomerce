import React from 'react'
import { Container } from "react-bootstrap";
import FooterContent from "../../FooterContent";

const PersonalStyling = () => {
  return (
    <div className="personalStyling">
      <Container>
        <div className="title mb-20">Personal Styling</div>
        <div className="table-content">
          <div className="title-wraper">
            <div className="table-title">Personal Styling</div>
          </div>
          <FooterContent />
        </div>
      </Container>
    </div>
  );
}

export default PersonalStyling