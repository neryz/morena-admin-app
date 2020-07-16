/* eslint-disable */
import React, { Component } from 'react';

const TokenContext = React.createContext({
  token: null,
});

class TokenProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      saveToken: (token) => this.setState({ token }),
    };
  }

  render() {
    return (
      <TokenContext.Provider value={this.state}>
        {this.props.children}
      </TokenContext.Provider>
    );
  }
}

const TokenConsumer = TokenContext.Consumer;

export default TokenContext;
export { TokenProvider, TokenConsumer };
