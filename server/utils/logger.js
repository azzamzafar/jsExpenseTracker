const ecsFormat = require('@elastic/ecs-pino-format')
const pino = require('pino')
const dblogfile = pino.transport({
    target: 'pino/file',
    options: { destination: `../sql.log`},
});
const serverlogfile = pino.transport({
    target: 'pino/file',
    options: {destination: `../server.log`}
})

module.exports={
   dblogger: pino(ecsFormat(),dblogfile),
   serverlogger:pino(ecsFormat(),serverlogfile)
}