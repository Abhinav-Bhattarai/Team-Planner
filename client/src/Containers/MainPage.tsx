import React from 'react';
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//     uri: 'http://localhost:8000/graphql',
//     cache: new InMemoryCache()
// });

interface PROPS {
    ChangeAuthentication: (type: boolean) => void;
};

const MainPage: React.FC<PROPS> = props => {
    return (
        <React.Fragment>
            {/* <ApolloProvider client={client}>
            
            </ApolloProvider> */}
        </React.Fragment>
    )
};

export default MainPage;