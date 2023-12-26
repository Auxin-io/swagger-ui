import React from "react"
import PropTypes from "prop-types"

import RollingLoadSVG from "core/assets/rolling-load.svg"

export default class App extends React.Component {
  constructor() {
    super()
    this.state = { isLoading: true }

  }
  getLayout() {
    let { getComponent, layoutSelectors } = this.props
    const layoutName = layoutSelectors.current()
    const Component = getComponent(layoutName, true)
    return Component ? Component : () => <h1> No layout defined for &quot;{layoutName}&quot; </h1>
  }

  componentDidMount() {
    this.resp();
  }

  resp = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let token = urlParams.get("token")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "privilege": "ReadOnlyTeamMember",
      "token": token,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try {
      // console.log(`ENV VAR CLOUD ENVIRONMENT ${process.env.CLOUD_ENVIRONMENT}`);
      // let url = "https://platform.auxin.cloud/api/v1/user"
      // if (process.env.CLOUD_ENVIRONMENT == "dev" || process.env.CLOUD_ENVIRONMENT == "un") {
      //   url = "https://platform-dev.auxin.cloud/api/v1/user"
      // }
      let url = "https://platform-dev.auxin.cloud/api/v1/user"
      const resp1 = await fetch(`${url}/token/validate`, requestOptions)
      if (resp1.ok) {
        this.setState({ isLoading: false })
        return

      }

      window.location.replace("https://alphaai-dev.auxin.cloud");


    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoading } = this.state
    console.log(this.state.isLoading);
    const Layout = this.getLayout()

    return isLoading ? <span className="model model-title">
      <span className="model-title__text">Loading</span>
      <RollingLoadSVG height="20px" width="20px" />
    </span> : <Layout />
    // return isLoading ? <h1>Loading...</h1> : <Layout />
  }
}

App.propTypes = {
  getComponent: PropTypes.func.isRequired,
  layoutSelectors: PropTypes.object.isRequired,
}

App.defaultProps = {
}
