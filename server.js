import { strapi } from "@/e_shared/api";
import { apiUrl } from "@/routes";
import { error } from "console";
import cron from "node-cron";

//86400000

export async function startCron() {
  const cronId = cron.schedule("0 18 * * *", () => {
    try {
      const intervalId = setInterval(() => {
        console.log("sup");
      }, 5000);
      
      const payload =  {
        data: {
          cronId: intervalId,
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
      console.log("start cron err: ", error);
    }
  });
}
