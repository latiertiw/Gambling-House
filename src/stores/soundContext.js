import React from 'react';

const SoundContext = React.createContext({
    on: false,
    toogleSound: () => {}
});

export default SoundContext