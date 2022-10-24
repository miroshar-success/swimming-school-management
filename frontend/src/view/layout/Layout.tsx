import DashboardLayout from 'src/mui/shared/Layouts/DashboardLayout';
import Footer from 'src/mui/shared/Footer';
import Header from 'src/view/layout/Header';
import MDBox from 'src/mui/components/MDBox';
import React from 'react';

class Layout extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <DashboardLayout>
        <Header {...this.props} />
        <MDBox py={2.4}>{this.props.children}</MDBox>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default Layout;
