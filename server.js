import cron from "node-cron";

//86400000

export async function startCron(){
    const cronId = cron.schedule("0 18 * * *", ()=>{
        // const intervalId = setInterval(()=>{
        //     console.log('sup'); 
        // },10000)
        console.log('sup');
        
        cronId.stop();
    })
}