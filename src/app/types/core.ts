export interface IAttribute {
  name: string;
  value: any;
}

export type HTML_INPUT_TYPE = 'number' | 'search' | 'button' | 'time' | 'image' | 'text' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'month' | 'password' | 'radio' | 'range';

export type HTML_BUTTON_TYPE = 'submit' | 'reset' | 'button';

export type MATERIAL_INPUT_APPERANCE = 'legacy' | 'standard' | 'fill' | 'outline';

export type MATERIAL_BUTTON_APPERANCE = 'raised' | 'flat' | 'stroked' | 'icon' | 'fab' | 'mini-fab' | '';

export interface IMenu {
  text: string;
  icon?: string;
  link?: string;
  action?: Function;
}

export interface IBreadcrumb {
  text: string;
  icon?: string;
  link?: string;
}