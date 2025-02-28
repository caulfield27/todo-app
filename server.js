import { strapi } from "@/e_shared/api";
import { apiUrl } from "@/routes";
import axios from "axios";
import { error } from "console";
import cron from "node-cron";

//86400000

export async function startCron(email, userId, token) {
  const cronId = cron.schedule("40 16 * * *", () => {
    try {
      const intervalId = setInterval(() => {
        axios.post('/api/checkTodoes',{email, userId, token}).then((res)=>{
          console.log(res);
        }).catch((e)=>{
          console.log('check todoes error: ', e);
        })
      }, 5000);
      
      const payload =  {
        data: {
          cronId: intervalId,
          email
        }
      };
      
      strapi.post(apiUrl.cronId,payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_STATIC_TOKEN}`,
          },
        }
      );
      cronId.stop();
    } catch (e) {
      console.log("cron err: ", error);
    }
  });
}
