module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'コンポーネントを作成',
    prompts: [
      {
        type: 'list',
        name: 'generatorType',
        message: '何を生成しますか？:',
        choices: ['component', 'page', 'api'],
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'コンポーネント名を入力してください:',
        when: (answers) => answers.generatorType === 'component',
      },
      {
        type: 'input',
        name: 'componentRoute',
        message: 'src/components/以下に続くコンポーネントのルーティングを入力してください（任意）:',
        when: (answers) => answers.generatorType === 'component',
      },
      {
        type: 'input',
        name: 'route',
        message: 'ルーティングを入力してください:',
        when: (answers) =>
          answers.generatorType === 'page' || answers.generatorType === 'api',
      },
    ],
    actions: function (data) {
      const actions = []

      if (data.generatorType === 'component') {
        actions.push(
          {
            type: 'add',
            path: 'src/components/{{componentRoute}}/{{kebabCase componentName}}/{{kebabCase componentName}}.tsx',
            templateFile: 'plop-templates/component.tsx.hbs',
            skipIfExists: true, // 追加
          },
          {
            type: 'add',
            path: 'src/components/{{componentRoute}}/{{kebabCase componentName}}/index.ts',
            templateFile: 'plop-templates/index.ts.hbs',
            skipIfExists: true, // 追加
          },
          {
            type: 'add',
            path: 'src/components/{{componentRoute}}/{{kebabCase componentName}}/{{kebabCase componentName}}.stories.tsx',
            templateFile: 'plop-templates/component.stories.tsx.hbs',
            skipIfExists: true, // 追加
          },
        )
      } else if (data.generatorType === 'page') {
        const routeParts = data.route.split('/')
        const pageName = routeParts[routeParts.length - 1]
        actions.push({
          type: 'add',
          path: 'src/app/{{route}}/page.tsx',
          templateFile: 'plop-templates/page.tsx.hbs',
          data: { pageName: pageName },
          skipIfExists: true, // 追加
        })
      } else if (data.generatorType === 'api') {
        const routeParts = data.route.split('/')
        const pageName = routeParts[routeParts.length - 1]
        actions.push({
          type: 'add',
          path: 'src/app/api/{{route}}/route.ts',
          templateFile: 'plop-templates/route.ts.hbs',
          data: { pageName: pageName },
          skipIfExists: true, // 追加
        })
      }

      return actions
    },
  })
}
