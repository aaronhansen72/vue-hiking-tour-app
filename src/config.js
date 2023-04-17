let appconfig;

if (process.env.NODE_ENV === "production") {
  appconfig = {
    $app_base_url: "http://www.cube-online.de/vue-hikingToursApp",
    $app_title: "Hiking Tours App 2.0 (live)"
  };
} else {
  appconfig = {
    $app_base_url: "http://localhost:8080",
    $app_title: 'Hiking Tours App 2.0'
  };
}

console.log("HELP", appconfig.$app_base_url)
export { appconfig }