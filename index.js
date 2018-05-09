'use strict';

const Telegram= require('telegram-node-bot');
// PersistentMemoryStorage=require('./adapters/PersistentMemoryStorage'),
// storage=new PersistentMemoryStorage(
//     `${__dirname}/data/participantStorage.json`
// );

const tg=new Telegram.Telegram('571321316:AAESH5MDtz2f1fst0vel1SUecPSZRPfgg-k',{
    workers:1,
    //storage:storage
})

// const PingController=require('./controllers/ping');
const OtherwiseController=require('./controllers/otherwise');

// tg.router.when(new Telegram.TextCommand('/ping','pingCommand'),new PingController())
//     .otherwise(new OtherwiseController())

//const JudgeController=require('./controllers/judge');
const AdminController=require('./controllers/admin');
const ParticipantController=require('./controllers/participant');
const MenuController=require('./controllers/menu');

//const judgeCtrl=new JudgeController();
const adminCtrl=new AdminController();
const participantCtrl=new ParticipantController();
const menuCtrl=new MenuController();

tg.router.when(new Telegram.TextCommand('/menu','menuCommand'),menuCtrl)
.when(new Telegram.TextCommand('/add','addCommand'),adminCtrl)
.when(new Telegram.TextCommand('/get','getCommand'),adminCtrl)
.when(new Telegram.TextCommand('/delete','deleteCommand'),adminCtrl)
.when(new Telegram.TextCommand('/enterinfo','enterCommand'),adminCtrl)
.when(new Telegram.TextCommand('/participate','participateCommand'),participantCtrl)
    .otherwise(new OtherwiseController())    

// function exitHandler(exitCode){
//     storage.flush();
//     process.exit(exitCode);
// }    

// process.on('SIGINT',exitHandler.bind(null,0));
// process.on('uncaughtException',exitHandler.bind(null,1));