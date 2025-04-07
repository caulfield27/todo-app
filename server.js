import { BASE_URL } from "@/e_shared/get-env";
import { apiUrl } from "@/routes";
import cron from "node-cron";

export async function startCron(email, userId, token) {
  try {
    const cronId = cron.schedule("0 9 * * *", () => {
      fetch(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/checkTodoes`, {
        method: "POST",
        body: JSON.stringify({
          email,
          userId,
          token,
        }),
      });
    });
    fetch(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/checkTodoes`, {
      method: "POST",
      body: JSON.stringify({
        email,
        userId,
        token,
      }),
    });

    const strapiPayload = {
      data: {
        cronId: cronId.options.name,
        user: email,
      },
    };

    fetch(`${BASE_URL}/api${apiUrl.cronId}`, {
      method: "POST",
      body: JSON.stringify(strapiPayload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).catch((e) => {
      console.log("strapi cron post error: ", e);
    });
  } catch (e) {
    console.log(e);
  }
}

export async function stopCron(email, token) {
  const cronTasks = cron.getTasks();
  fetch(`${BASE_URL}/api${apiUrl.getUserCron(email)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const currentCron = cronTasks.get(res?.data[0]?.cronId);
      if (currentCron) {
        const documentId = res?.data[0]?.documentId;
        currentCron.stop();
        cronTasks.delete(res?.data[0]?.cronId);
        if (documentId) {
          fetch(`${BASE_URL}/api${apiUrl.deleteCron(documentId)}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      }
    })
    .catch((e) => {
      console.log("get user cron error: ", e);
    });
}
