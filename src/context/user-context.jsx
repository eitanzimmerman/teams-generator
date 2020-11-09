import React from 'react';

const UserContext = React.createContext({
    currentUser: null,
    authenticateUser: () => {},
    logoutUser: () => {}
})

export default UserContext;