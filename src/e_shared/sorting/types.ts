export interface ISortingOptions{
    label: string,
    icon: React.ReactElement,
    value: SortValuesType
}

export type SortValuesType = "importance" | "alphabet" | "createDate" | "executionDate";