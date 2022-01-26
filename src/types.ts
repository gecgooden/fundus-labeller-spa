export enum IPCChannels {
    OrganiseFiles = 'organise-files'
}

export interface OrganiseFilesArg {
    images: Array<{
        src: string
        name: string
        label: string
    }>
    targetFolder: string
}

export interface Report {
    timestamp: Date
    results: LabelResult[]
}  

export interface LabelResult {
    file: File
    label: string | undefined
    predictions: Result[]
}

export interface Result {
    label: string
    prediction: number
}