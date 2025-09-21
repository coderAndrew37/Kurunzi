export interface NavItem {
  _id: string;
  title: string;
  href: string;
  isLive?: boolean;
  subItems?: NavItem[];
}
