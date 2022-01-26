import { Dispatch } from "react";
import { Report } from "./types";

export enum Tab {
    Label = "Label",
    Report = "Report",
    Settings = "Settings",
}

export enum Action {
    ChangeTab = "ChangeTab",
    ModelLoaded = "ModelLoaded",
    ReportCreated = "ReportCreated",
}

export interface ChangeTabAction {
    type: Action.ChangeTab
    tab: Tab
}

export interface ModelLoadedAction {
    type: Action.ModelLoaded
}

export interface ReportCreatedAction {
    type: Action.ReportCreated
    report: Report
}

export type Actions = ChangeTabAction | ModelLoadedAction | ReportCreatedAction;

export interface AppState {
    currentTab: Tab
    model: boolean
    report: Report | undefined
    dispatch: Dispatch<Actions>
}

export const appReducer = (state: AppState, action: Actions): AppState => {
    switch (action.type) {
        case Action.ChangeTab:
            return {
                ...state,
                currentTab: action.tab,
            };
        case Action.ModelLoaded:
            return {
                ...state,
                model: true,
            }
        case Action.ReportCreated:
            return {
                ...state,
                report: action.report,
            }
        default:
            throw new Error(`Unexpected action type: ${action}`);
    }
}