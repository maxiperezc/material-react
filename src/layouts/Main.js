import React from 'react'
import PropTypes from 'prop-types'

// routes 
import { Route, Switch, Redirect } from 'react-router'
import routes from "routes.js";

// API
// import API from 'library/API'
// import Auth from './Auth.js'

// scrollbar
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

// core components
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Notify from "components/Notify/Notify.js";


//styles
import { withStyles } from '@material-ui/core/styles'
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import image from "assets/img/sidebar.jpg";
import logo from "assets/img/logo.png";


let perfectScroll;

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = { mobileOpen: false, messageOpen: false }

    this.resizeFunction = this.resizeFunction.bind(this)
    this.toggleMobile = this.toggleMobile.bind(this)
    
    this.mainPanel = React.createRef();
  }

  toggleMobile() { this.setState({ mobileOpen: !this.state.mobileOpen }) }

  resizeFunction() { if(window.innerWidth >= 960) this.setState({ mobileOpen: false }) }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      perfectScroll = new PerfectScrollbar(this.mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener('resize', this.resizeFunction)
  }

  componentWillUnmount() { 
    if (navigator.platform.indexOf("Win") > -1) {
      perfectScroll.destroy();
    }
    window.removeEventListener('resize', this.resizeFunction)
  }

  render() {
    const { classes, message, closeNotify, ...rest } = this.props

    //if(!this.props.user.id) return <Auth {...this.props} />

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={'Chatter Admin'}
          logo={logo}
          image={image}
          handleDrawerToggle={this.toggleMobile}
          open={this.state.mobileOpen}
          color='orange'
          user={this.props.user}
          {...rest}
        />

        <Notify
          open={message.open}
          type={message.type}
          text={message.text}
          onClose={closeNotify}
        />
  
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <div className={classes.content}>
            <div className={classes.container}>
              
              <Switch>
                {routes.map((prop, key) => {
                  const Component = prop.component
                  return (
                    <Route path={prop.layout + prop.path} key={key}>
                      <Component {...rest} />
                    </Route>
                  )
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
              
            </div>
          </div>

          <Footer />
        </div>
      </div>
    )
  }
}

Main.propTypes = { classes: PropTypes.object.isRequired }

export default withStyles(styles, { withTheme: true })(Main);
