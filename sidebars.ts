import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Products',
      items: [
        'products/nm-cyd-c5',
        {
          type: 'category',
          label: 'NM-RF-HAT',
          link: {
            type: 'doc',
            id: 'products/nm-rf-hat',
          },
          items: [
            'products/nm-rf-hat-quick-start',
            'products/nm-rf-hat-faq',
          ],
        },
        'products/nm-display-28',
        {
          type: 'category',
          label: 'NM-EPD-420',
          link: {
            type: 'doc',
            id: 'products/nm-epd-420',
          },
          items: [
            'products/nm-epd-420-quickstart',
          ],
        }
      ],
    },
    {
      type: 'category',
      label: 'Developer',
      items: [
        {
          type: 'category',
          label: 'MicroPython',
          items: [
            'developer/micropython/micropython-with-nm-cyd-c5',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Applications',
      items: [
        {
          type: 'category',
          label: 'ESP32 AI',
          items: [
            'applications/esp32-ai/esp-claw-nm-cyd-c5',
            'applications/esp32-ai/esp-claw-nm-display-28inch',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
