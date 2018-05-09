// 'use strict';

// const Telegram= require('telegram-node-bot'),
//     fs=require('fs');

// class PersistentMemoryStorage extends Telegram.BaseStorage{
//     constructor(participantStoragePath){
//         super();

//         this.participantStoragePath=participantStoragePath;

//         this._storage={
//             participantStorage:require(participantStoragePath)
//         };
//     }

//     get(storage,key){
//         return new Promise((resolve,reject)=>{
//             resolve(this._storage[storage][key] || {});
//         });
//     }

//     set(storage,key,data){
//         return new Promise((resolve)=>{
//             this._storage[storage][key]=data;
//             resolve();
//         });
//     }

//     remove(storage,key){
//         return new Promise((resolve)=>{
//             delete this._storage[storage][key];
//             resolve();
//         })
//     }

//     flush(){
//         fs.writeFileSync(this.participantsStoragePath,JSON.stringify(this._storage.participantStorage));
//         //fs.writeFileSync(this.chatStoragePath,JSON.stringify(this._storage.chatStorage));
//     }
// }

// module.exports=PersistentMemoryStorage;