const { Keystone } = require('@keystone-alpha/keystone')
const { Text } = require('@keystone-alpha/fields')
const { GraphQLApp } = require('@keystone-alpha/app-graphql')
const { AdminUIApp } = require('@keystone-alpha/app-admin-ui')
const { StaticApp } = require('@keystone-alpha/app-static')
const { MongooseAdapter: Adapter } = require('@keystone-alpha/adapter-mongoose')

const keystone = new Keystone({
  name: 'Keystone To-Do List',
  adapter: new Adapter()
})

keystone.createList('Todo', {
  schemaDoc: 'A list of things which need to be done',
  fields: {
    name: {
      type: Text,
      schemaDoc: 'This is the thing you need to do'
    }
  }
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/', src: 'public' }),
    new AdminUIApp({ enableDefaultRoute: true })
  ]
}
