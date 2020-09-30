// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Edit Photos For Free",
  siteUrl: 'https://editphotosforfree.com',
  pathPrefix: '',
  siteDescription: 'Edit Photos For Free is collection of image tools and apps for photographers and designers',
  plugins: [
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: ''
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Blog",
        path: "./content/blogs/**/*.md"
      }
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Tool', // Required
        baseDir: './content/tools', // Where .md files are located
        pathPrefix: '/phototools', // Add route prefix. Optional
        template: './src/templates/Tool.vue', // Optional
        plugins: [
          [ 'gridsome-plugin-remark-shiki', { theme: 'Material-Theme-Palenight', skipInline: true } ]
      ],
      }
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'App', // Required
        baseDir: './content/apps', // Where .md files are located
        pathPrefix: '/photoapps', // Add route prefix. Optional
        template: './src/templates/App.vue', // Optional
        plugins: [
          [ 'gridsome-plugin-remark-shiki', { theme: 'Material-Theme-Palenight', skipInline: true } ]
      ],
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: [],
        config: {
          '/phototools/*': {
            changefreq: 'weekly',
            priority: 1
          },
          '/photoapps/*': {
            changefreq: 'weekly',
            priority: 1
          }
        }
      }
    }
  ],
  templates: {
    // Blog: "/blogs/:title"
  },
  transformers: {
    remark: {
      plugins: [
        [ 'gridsome-plugin-remark-shiki', { theme: 'Material-Theme-Palenight', skipInline: true } ]
      ],
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
    }
  },
};
