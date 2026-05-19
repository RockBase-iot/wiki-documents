import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Products',
      items: [
        'products/nm-cyd-c5',
        'products/nm-rf-hat',
        'products/nm-display-28',
      ],
    },
    {
      type: 'category',
      label: 'Developer',
      items: [
        'developer/getting-started',
      ],
    },
  ],
};

export default sidebars;
