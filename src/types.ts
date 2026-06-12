export type SidebarTab = 'explorer' | 'docs';

export interface DocSection {
  id: string;
  title: string;
  type: 'language' | 'api' | 'guide';
}
