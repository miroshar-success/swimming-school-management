/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/* eslint-disable react/prop-types */
/**
  This file is used for controlling the dark and light state of the TimelineList and TimelineItem.
*/

import {
  createContext,
  useContext,
  ReactNode,
} from 'react';

// The Timeline main context
const Timeline = createContext<
  JSX.Element | boolean | null
>(null);

// Declaring props types for TimelineProvider
interface Props {
  children: ReactNode;
  value: boolean;
}

// Timeline context provider
function TimelineProvider({
  children,
  value,
}: Props): JSX.Element {
  return (
    <Timeline.Provider value={value}>
      {children}
    </Timeline.Provider>
  );
}

// Timeline custom hook for using context
function useTimeline() {
  return useContext(Timeline);
}

export { TimelineProvider, useTimeline };
