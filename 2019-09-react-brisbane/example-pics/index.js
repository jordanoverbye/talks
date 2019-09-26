const {
  CloudinaryImage,
  Relationship,
  Text,
  Password,
  Color
} = require('@keystone-alpha/fields')
const { Keystone } = require('@keystone-alpha/keystone')
const { PasswordAuthStrategy } = require('@keystone-alpha/auth-password')
const { NextApp } = require('@keystone-alpha/app-next')
const { GraphQLApp } = require('@keystone-alpha/app-graphql')
const { AdminUIApp } = require('@keystone-alpha/app-admin-ui')
const { MongooseAdapter } = require('@keystone-alpha/adapter-mongoose')
const { CloudinaryAdapter } = require('@keystone-alpha/file-adapters')

const PROJECT_NAME = 'Pics of Billy'

const cloudinaryAdapter = new CloudinaryAdapter({
  cloudName: '',
  apiKey: '',
  apiSecret: ''
})

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new MongooseAdapter()
})

keystone.createList('Post', {
  fields: {
    image: { type: CloudinaryImage, adapter: cloudinaryAdapter },
    title: { type: Text },
    color: { type: Color },
    tags: {
      type: Relationship,
      ref: 'Tag',
      many: true
    }
  }
})

keystone.createList('Tag', {
  fields: {
    name: { type: Text }
  }
})

keystone.createList('User', {
  fields: {
    username: { type: Text },
    password: { type: Password }
  }
})

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'username',
    secretField: 'password'
  }
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({ adminPath: '/admin', authStrategy }),
    new NextApp({ dir: 'app' })
  ]
}
