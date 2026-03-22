export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}
