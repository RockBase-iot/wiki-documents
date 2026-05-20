import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const githubRepository = process.env.GITHUB_REPOSITORY ?? 'RockBase-iot/wiki-documents';
const [githubOwner, githubRepo] = githubRepository.split('/');
const isCiBuild = process.env.GITHUB_ACTIONS === 'true' || process.env.CI === 'true';

const defaultUrl = isCiBuild
  ? `https://${githubOwner}.github.io`
  : 'https://wiki.rockbaseiot.com';

const defaultBaseUrl = isCiBuild
  ? `/${githubRepo}/`
  : '/';

const siteUrl = isCiBuild
  ? (process.env.DOCUSAURUS_URL ?? defaultUrl)
  : defaultUrl;

const siteBaseUrl = isCiBuild
  ? (process.env.DOCUSAURUS_BASE_URL ?? defaultBaseUrl)
  : '/';

const config: Config = {
  title: 'RockBase IoT Wiki',
  tagline: 'Developer Documentation & Product Knowledge Base',
  favicon: 'img/favicon.ico',

  url: siteUrl,
  baseUrl: siteBaseUrl,

  organizationName: 'RockBase-iot',
  projectName: 'wiki-documents',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      zh: {
        label: '中文',
        htmlLang: 'zh-CN',
      },
    },
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/RockBase-iot/wiki-documents/edit/main/',
        },
        blog: false,
        theme: {
          customCss: [
            './src/css/custom.css',
            './src/css/rockbase-theme.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'RockBase IoT',
      logo: {
        alt: 'RockBase IoT Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/products/nm-cyd-c5',
          label: 'Products',
          position: 'left',
        },
        {
          to: '/docs/developer/micropython/micropython-with-nm-cyd-c5',
          label: 'Developer',
          position: 'left',
        },
        {
          to: '/docs/applications/esp32-ai/esp-claw-nm-cyd-c5',
          label: 'Applications',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/RockBase-iot/wiki-documents',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://rockbaseiot.com',
          label: 'Back to Website',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Intro',
              to: '/docs/',
            },
            {
              label: 'Products',
              to: '/docs/products/nm-cyd-c5',
            },
            {
              label: 'Developer',
              to: '/docs/developer/micropython/micropython-with-nm-cyd-c5',
            },
            {
              label: 'Applications',
              to: '/docs/applications/esp32-ai/esp-claw-nm-cyd-c5',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/RockBase-iot',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Website',
              href: 'https://rockbaseiot.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/RockBase-iot/wiki-documents',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} RockBase IoT. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'python', 'cpp'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
