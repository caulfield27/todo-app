import { strapi } from "@/e_shared/api";
import { BASE_URL } from "@/e_shared/get-env";
import { apiUrl } from "@/routes";
import axios from "axios";
import cron from "node-cron";

//86400000
export async function startCron(email, userId, token) {
  try {
    const cronId = cron.schedule("* * * * *", () => {
      console.log('test');
      
      // axios.post("/api/checkTodoes", {
      //   email,
      //   userId,
      //   token,
      // });
    });

    const strapiPayload = {
      data: {
        cronId: cronId.options.name,
        user: email
      },
    };

    fetch(`${BASE_URL}/api${apiUrl.cronId}`,{
      method: "POST",
      body: JSON.stringify(strapiPayload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).catch((e)=>{
      console.log('strapi cron post error: ', e);
    })
  } catch (e) {
    console.log("start cron error: ", e);
  }
}

export function stopCron(email) {
  
}
