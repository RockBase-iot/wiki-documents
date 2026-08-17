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
          label: 'GPS / GNSS',
          link: {
            type: 'doc',
            id: 'products/nm-atgm336h',
          },
          items: [
            'products/nm-atgm336h',
          ],
        },
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
        },
        'products/nm-tv-154',
        'products/nm-solar',
        'products/k230-vision',
      ],
    },
    {
      type: 'category',
      label: 'Projects',
      items: [
        'projects/overview',
        'projects/deskbuddy-tv',
        'projects/esp32-plane-radar',
        'projects/nm-epd-420-ecosystem',
        'projects/esp32-dashboard',
        'projects/esp32-weather-epd',
        'projects/biscuit',
        'projects/hardware-buddy',
      ],
    },
    {
      type: 'category',
      label: 'Platform',
      items: [
        'platform/web-flasher',
        'platform/espwebapps',
        'platform/community',
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
          label: 'e-Paper',
          items: [
            'applications/e-Paper/nm-epd-420-esp32-dashboard',
          ],
        },
        {
          type: 'category',
          label: 'ESP32 AI',
          items: [
            'applications/esp32-ai/esp-claw-nm-cyd-c5',
            'applications/esp32-ai/esp-claw-nm-display-28inch',
            'applications/esp32-ai/esp-claw-meshtastic-guide',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
