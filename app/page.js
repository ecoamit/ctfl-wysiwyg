// app/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { init, locations } from '@contentful/app-sdk';
import TinyMCEEditor from './components/TinyMCEEditor';

const HomePage = () => {
  const [sdk, setSdk] = useState("");

  useEffect(() => {
    
      init((sdk) => {
        if (sdk.location.is(locations.LOCATION_ENTRY_FIELD)) {
          setSdk(sdk);
        }
      });
    }
  , []);

  return sdk && <TinyMCEEditor sdk={sdk} /> 
};

export default HomePage;
