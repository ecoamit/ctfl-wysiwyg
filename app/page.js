"use client";
// app/page.js
import React, { useEffect, useState } from "react";
import { init, locations } from "@contentful/app-sdk";
import TinyMCEEditor from "./components/TinyMCEEditor";

const HomePage = () => {
  const [sdk, setSdk] = useState(null);

  useEffect(() => {
    // Check if the code is running inside the Contentful iframe
    if (window.self !== window.top) {
      init((sdk) => {
        if (sdk.location.is(locations.LOCATION_ENTRY_FIELD)) {
          setSdk(sdk);
        }
      });
    }
  }, []);

  return sdk ? (
    <TinyMCEEditor sdk={sdk} />
  ) : (
    <p>Please open this app within Contentful.</p>
  );
};

export default HomePage;
