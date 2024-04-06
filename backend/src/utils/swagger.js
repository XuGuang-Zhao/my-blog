const path = require('path')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('swagger-jsdoc')

// swaggger-jsdoc配置
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Big Event Server',
            version: 'V0.0.1',
            decription: 'This is a nodejs server',
        },
        servers: [
            {
              url: 'http://127.0.0.1:8080',
            }
          ],
    },
    // 去哪个路由下收集swagger
    apis: [path.join(__dirname, '../router/*.js')]
}

const swaggerSpec = swaggerDoc(options)


const swaggerInstall = function(app) {
    // 使用swaggerSpec生成swagger文档页面，并开放在指定路由
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
}

module.exports = swaggerInstall