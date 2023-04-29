export interface IMenuItem {
    label: string;
    icon?: string;
    iconUrl?: string;
    path: string;
    basepath: string;
    hasSub: boolean;
    children?: IMenuItem[];
    isSelected: boolean;

}
