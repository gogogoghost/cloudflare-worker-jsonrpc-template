import { JSONRPCServer } from "json-rpc-2.0";

const s=new JSONRPCServer()

s.addMethod("main.login",({user,pass})=>{
    return `${user} has logined with pass: ${pass}`
})

export default s