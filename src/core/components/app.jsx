import React from "react"
import PropTypes from "prop-types"

export default class App extends React.Component {

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
      const resp1 = await fetch("https://platform-dev.auxin.cloud/api/v1/user/token/validate", requestOptions)
      console.log(resp1);
      this.setState({
        respStatus: resp1.status
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const Layout = this.getLayout()

    console.log(this?.state?.respStatus);

    if (this?.state?.respStatus == undefined) {
      return null;
    }
    if (this?.state?.respStatus && this?.state?.respStatus != 200) {
      console.log("Redirect");
      // window.location.replace("https://alphaai-dev.auxin.cloud");
    } else {
      console.log("Dont Redirect");
    }

    return (
      <Layout />
    )
  }
}

App.propTypes = {
  getComponent: PropTypes.func.isRequired,
  layoutSelectors: PropTypes.object.isRequired,
}

App.defaultProps = {
}
