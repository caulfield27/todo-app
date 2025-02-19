// export function startCron(userEmail, userToken) {
//   if (!cronJob) {
//     cronJob = cron.schedule("* * * * *", async () => {
//       fetch(`http://localhost:3000/api/checkTodoes`, {
//         method: "POST",
//         body: JSON.stringify({
//           email: userEmail,
//           token: userToken,
//         }),
//       }).catch((e) => {
//         console.log(e);
//       });
//     });
//   }
//   console.log(cronJob);
  
// }

// export function stopCron(userEmail) {
//   if (cronJob) {
//     console.log('test');
    
//     cronJob.stop();
//   }
// }
