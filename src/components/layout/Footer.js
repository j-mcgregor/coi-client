import React from 'react';
import termsOfUse from '../../img/Terms of Use.pdf';
import privacyPolicy from '../../img/Privacy Policy.pdf';

export default () => {
  return (
    <div className="footer container-fluid bg-main-grey-darken p-5">
      <div className="container text-center">
        <a
          href="https://www.facebook.com/CircleOfYoungIntrapreneurs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook" />
        </a>
        <a
          href="https://twitter.com/circleofyi?lang=en/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter" />
        </a>
        <a
          href="https://www.linkedin.com/company/circle-of-young-intrapreneurs//"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin" />
        </a>
        <a
          href="https://www.instagram.com/thecircleofyi/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCtM8zWux6MF5CGAXcNqLuwg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-youtube" />
        </a>
        <a href="mailto:team@circleofyi.com">
          <i className="fas fa-envelope" />
        </a>
      </div>
      <div className="row mt-3 privacy">
        <div className="col-3 offset-3 text-center">
          <a href={termsOfUse} download>
            Terms and Conditions
          </a>{' '}
        </div>
        <div className="col-3 text-center">
          <a href={privacyPolicy} download>
            Privacy Policy
          </a>
        </div>
      </div>
      <div className="container text-center">
        <p className="text-muted py-3 mt-3">
          Website created by Jack McGregor <br />
          <a
            href="https://github.com/patchyj"
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '10px' }}
          >
            <i className="fab fa-github" style={{ fontSize: '20px' }} />
          </a>
          <a
            href="https://www.linkedin.com/in/jack-mcgregor/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '10px' }}
          >
            <i className="fab fa-linkedin" style={{ fontSize: '20px' }} />
          </a>
        </p>
        <p className="text-muted">
          <i className="far fa-copyright px-3" />
          2018 Circle of Intrapreneurs
        </p>
      </div>
    </div>
  );
};
