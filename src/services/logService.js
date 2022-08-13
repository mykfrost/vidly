//import Raven from "raven-js";

function init(){
//     Raven.config("https://4c2844f466e6433e8d9372d913e1d5a2@o1351978.ingest.sentry.io/6632847",{
//     release: "1.0.0",
//     environment: "development-test"
// }).install();
}

function log(error){
    console.error(error)
    // Raven.captureException(error);
}
export default{
    init ,
    log
};