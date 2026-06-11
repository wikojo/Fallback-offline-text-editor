export type SidebarTab = 'explorer' | 'docs' | 'search';

export interface DocSection {
  id: string;
  title: string;
  type: 'language' | 'api' | 'guide';
}
