export interface Container {
    elementName: string;
    user: string;
    date: Date;
    workArea: string;
    description: string;
    files: { fileName: string }[];
}