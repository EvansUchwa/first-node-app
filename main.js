require("source-map-support/register"),module.exports=function(e){var t={};function o(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=9)}([function(e,t,o){let n=o(11).createConnection({host:"localhost",user:"root",password:"",database:"stuud-api"});n.connect(e=>{e?console.log(e):console.log("You are connect")});e.exports={dbConnection:n,simpleSelectQuery:(e,t,o,n)=>new Promise((s,r)=>e.query("SELECT "+o+" FROM "+t+" "+n,(e,t)=>{e?r(e):s(t)})),insertQuery:(e,t,o)=>new Promise((n,s)=>e.query("INSERT INTO "+t+" VALUES("+o+") ",(e,t)=>{e?s(e):n(t)}))}},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("bcryptjs")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,o){const n=o(3),{dbConnection:s,simpleSelectQuery:r,insertQuery:i}=o(0);t.register=async(e,t)=>{t.send("Tu te register");const o=e.body,l=await n.hash(o.password,12);r(s," users "," * ",' WHERE pseudo = "'+o.pseudo+'" OR mail = "'+o.mail+'" ').then(e=>{e.length<=0?i(s," users(pseudo,mail,sexe,age,type_etablissement,nom_etablissement,filière_serie,password) ",'"'+o.pseudo+'","'+o.mail+'","'+o.sexe+'",'+o.age+',"'+o.type_etablissement+'","'+o.nom_etablissement+'","'+o.filière_serie+'","'+l+'"').then(e=>{1==e.affectedRows&&console.log("Tu as été bien enregistré avec l'id "+e.insertId)}).catch(e=>console.log(e)):console.log("tu existe")}).catch(e=>console.log(e))}},function(e,t,o){const n=o(3),s=o(4),{dbConnection:r,simpleSelectQuery:i}=o(0);t.login=async(e,t)=>{const o=e.body;await n.hash(o.password,12);i(r," users "," * ",' WHERE pseudo = "'+o.pseudo+'" OR mail = "'+o.mail+'" ').then(e=>{e.length>0?n.compare(o.password,e[0].password,(function(o,n){if(n){const o=s.sign({id:e[0].id},"the-super-strong-secrect",{expiresIn:"1h"});t.json({token:o})}else console.log("Mot de passe incorrect")})):console.log("Mail ou mot de passe incorrect")}).catch(e=>console.log(e))}},function(e,t,o){const{dbConnection:n,simpleSelectQuery:s}=o(0);t.liste_etablissement=(e,t)=>{let o=e.params,r="",i="";["Université","Ecole"].includes(o.type)?r="universites_ecoles":"Collège"==o.type?r="colleges":"Lycée"==o.type&&(r="lycees"),i=' WHERE nom LIKE "%'+o.type+'%" ',s(n,r," id,nom ",i+" ORDER BY nom ").then(e=>{t.send({text:"ok",data:e})})}},function(e,t,o){const{dbConnection:n,simpleSelectQuery:s}=o(0);t.liste_filière=(e,t)=>{let o=e.params,r="";r=["Université","Ecole"].includes(o.type_etablissement)?"filieres_universite":"filieres_series_lycee",s(n,r," * "," ORDER BY nom ").then(e=>{t.send({text:"ok",data:e})})}},function(e,t,o){e.exports=o(13)},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("mysql")},function(e,t,o){const n=o(4),{dbConnection:s,simpleSelectQuery:r}=o(0);t.getUser=async(e,t)=>{e.body;if(e.headers.authorization&&e.headers.authorization.startsWith("Bearer")&&e.headers.authorization.split(" ")[1]){const o=e.headers.authorization.split(" ")[1];n.verify(o,"the-super-strong-secrect",(e,o)=>{if(null!=o){let e=o.id;r(s," users "," * "," WHERE id = "+e).then(o=>{o.length>0?t.send("Utilisateur: "+e+" Name:"+o[0].pseudo+" mail: "+o[0].mail):console.log("Mail ou mot de passe incorrect")}).catch(e=>console.log(e))}else console.log("Token not found")})}else console.log("header not set")}},function(e,t,o){"use strict";o.r(t);var n=o(1),s=o.n(n),r=(o(0),o(5)),i=o(6),l=(o(12),o(7)),c=o(8);const a=s.a.Router();a.post("/register",r.register),a.post("/login",i.login),a.get("/Liste-Etablissement/:type",l.liste_etablissement),a.get("/Liste-Filiere-Serie/:type_etablissement",c["liste_filière"]);var u=a,d=o(2),p=o.n(d);o(10).config();const f=s()(),{APP_PORT:g}=process.env;f.disable("etag"),f.use(p.a.json()),f.use(p.a.urlencoded({extended:!1})),f.use((e,t,o)=>{t.header("Access-Control-Allow-Origin","*"),t.header("Access-Control-Allow-Methods","GET,POST"),t.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),o()}),f.use("/studd-api",u),f.listen(g,()=>{console.log("express ok on "+g)})}]);
//# sourceMappingURL=main.map