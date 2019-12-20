import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'bisheng/router';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import iconSrc from '../../static/icon.png';

import * as utils from '../utils';

/* eslint-disable react/prefer-stateless-function */
class Home extends React.Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
  };

  render() {
    const {
      intl: { locale },
    } = this.context;
    const isZhCN = locale === 'zh-CN';
    return (
      <DocumentTitle title="JOY PRO">
        <>
          <div className="cover-wrapper">
            <div className="cover-content">
              <div className="cover-icon">
                <img style={{ width: 200 }} src={iconSrc} alt="" />
              </div>
              <h3>joy-pro</h3>
              <div className="cover-link">
                <a
                  className="github"
                  href="http://192.168.1.110/web-support/joy-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <Link
                  className="start"
                  to={utils.getLocalizedPathname('/docs/start/introduce', isZhCN)}
                >
                  Get Started
                </Link>
              </div>
              <div className="slogan">
                <FormattedMessage id="app.home.slogan" />
              </div>
            </div>
          </div>
        </>
      </DocumentTitle>
    );
  }
}

export default injectIntl(Home);
