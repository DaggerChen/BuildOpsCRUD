import React from 'react';
import ReactDOM from 'react-dom';
import { AUTH_TYPE } from 'aws-appsync'
import aws_config from './aws-exports';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloLink } from 'apollo-link';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from "apollo-cache-inmemory";
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';


const url = aws_config.aws_appsync_graphqlEndpoint;
const region = aws_config.aws_appsync_region;
const auth = {
	type: AUTH_TYPE.API_KEY,
	apiKey: aws_config.aws_appsync_apiKey
};
const link = ApolloLink.from([
	createAuthLink({ url, region, auth }),
	createHttpLink({ uri: url })
]);
const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>, document.getElementById('root')
);

reportWebVitals();
