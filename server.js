import { strapi } from "@/e_shared/api";
import { apiUrl } from "@/routes";
import axios from "axios";
import cron from "node-cron";

const intervals = new Map();
//86400000

export async function startCron(email, userId, token) {
  const cronId = cron.schedule("8 16 * * *", () => {
    try {
      const intervalId = setInterval(() => {
        console.log('sup');
        
        // axios.post('/api/checkTodoes',{email, userId, token}).then((res)=>{
        //   console.log(res);
        // }).catch((e)=>{
        //   console.log('check todoes error: ', e);
        // })
      }, 5000);
      intervals.set(email, intervalId);      
      // strapi.post(apiUrl.cronId,payload,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // cronId.stop();
    } catch (e) {
      console.log("cron err: ", e);
    }
  });
}


export function stopCron(email){
  console.log(intervals);
  
  if(intervals.has(email)){
    clearInterval(intervals.get(email));
  }
}