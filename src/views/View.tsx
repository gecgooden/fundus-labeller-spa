import React from 'react';
import { useAppState } from "../components/AppContext";
import { Tab } from "../reducer";
import { Label } from "./Label";
import { Report } from './Report';
import { Settings } from "./Settings";

export const View: React.FC = () => {
    const { currentTab } = useAppState();

    switch (currentTab) {
      case Tab.Label:
        return <Label />;
      case Tab.Report:
        return <Report />
      case Tab.Settings:
        return <Settings />
    }
} 