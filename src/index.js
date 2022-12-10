/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import {Router} from 'itty-router'
import s from './views'

const router = Router()

//rpc gateway
router.post("/jsonrpc",async (req)=>{
	const res=await s.receive(await req.json())
	if(res){
		return new Response(JSON.stringify(res),{
			headers:{
				'content-type': 'application/json'
			}
		})
	}else{
		return new Response(null,{status:204})
	}
})

//404
router.all("*", () => new Response("404, not found!", { status: 404 }))

export default {
	async fetch(req, env, ctx) {
		return router.handle(req,env,ctx)
	},
};
