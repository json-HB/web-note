// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const isDev = process.env.NODE_ENV == 'development';

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: "Haibo site",
	tagline: "Learning Note",
	url: isDev ? 'http://localhost:3000' : "https://json-hb.github.io/web-note",
	baseUrl: isDev ? '/' : "/web-note/",
	onBrokenLinks: "ignore",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "jason", // Usually your GitHub org/user name.
	projectName: "haibo", // Usually your repo name.

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"]
	},

	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl:
						"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/"
				},
				blog: {
					showReadingTime: true,
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl:
						"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/"
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css")
				}
			})
		]
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: "Home",
				logo: {
					alt: "Logo",
					src: "img/logo.svg"
				},
				items: [
					{
						type: "doc",
						docId: "home",
						position: "left",
						label: "Tutorial"
					}
					// {to: '/blog', label: 'Blog', position: 'left'},
					// {
					//   href: 'https://github.com/facebook/docusaurus',
					//   label: 'GitHub',
					//   position: 'right',
					// },
				]
			},
			footer: {
				style: "dark",
				// links: [
				//   {
				//     title: 'Docs',
				//     items: [
				//       {
				//         label: 'Tutorial',
				//         to: '/docs/intro',
				//       },
				//     ],
				//   },
				//   {
				//     title: 'Community',
				//     items: [
				//       {
				//         label: 'Stack Overflow',
				//         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
				//       },
				//       {
				//         label: 'Discord',
				//         href: 'https://discordapp.com/invite/docusaurus',
				//       },
				//       {
				//         label: 'Twitter',
				//         href: 'https://twitter.com/docusaurus',
				//       },
				//     ],
				//   },
				//   {
				//     title: 'More',
				//     items: [
				//       {
				//         label: 'Blog',
				//         to: '/blog',
				//       },
				//       {
				//         label: 'GitHub',
				//         href: 'https://github.com/facebook/docusaurus',
				//       },
				//     ],
				//   },
				// ],
				copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme
			}
		})
};

module.exports = config;
