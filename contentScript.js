function convertToCSV(objArray) {
  // Ensure that the input is an array of objects
  if (!Array.isArray(objArray) || objArray.length === 0) {
    throw new Error("Input should be an array of objects");
  }

  const header = Object.keys(objArray[0]);

  const csv = [
    header.join(","),
    ...objArray.map((obj) =>
      header
        .map((fieldName) => {
          if (obj[fieldName] === null || obj[fieldName] === undefined) {
            return "";
          } else if (
            typeof obj[fieldName] === "string" &&
            obj[fieldName].includes(",")
          ) {
            return `"${obj[fieldName]}"`;
          } else {
            return obj[fieldName];
          }
        })
        .join(",")
    ),
  ];

  return csv.join("\n");
}
function exportToCSV(data, filename) {
  const csv = convertToCSV(data);

  // Create a Blob object with the CSV data
  const blob = new Blob([csv], { type: "text/csv" });

  // Create a temporary anchor element to trigger the download
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  // Trigger a click event to download the CSV file
  a.click();

  // Clean up by revoking the Object URL
  URL.revokeObjectURL(url);
}
let apiUrl = "http://127.0.0.1:5000/";

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "scrape") {
    console.log("object");
    let post = await chrome.storage.local.get(["posts"]);
    let postObj = await chrome.storage.local.get(["obj"]);
    let postCount = parseInt(post.posts);
    let postsCheck = postObj.obj;

  

    // console.log(obj);
    // return
    let count = 0;
    let loopCount = 0;
    let data = [];
    // let myInterval=setInterval(()=>{
    //     window.scrollTo(0, document.body.scrollHeight)
    //    },2000)
    let scrollto = 0;
    setTimeout(async () => {
      let myInterval = setInterval(async () => {
        scrollto += 500;
        const mainElement=document.getElementsByTagName("article")
        console.log(mainElement);
        const rows=mainElement[0].querySelectorAll("div ._ac7v")
       const columns= rows[loopCount].querySelectorAll("._aabd")
      
       
    
          window.scrollTo({ top: scrollto, behavior: "smooth" });
        if(loopCount>=rows.length || count>=postCount){
          console.log(data)
          exportToCSV(data,"instaposts")
          clearInterval(myInterval)
        }
        else{
          loopCount++
          for(let i=0;i<3;i++){
            count++
            const item= columns[i].querySelector("a img")
            const sorce=item.getAttribute("src")
            data.push({
              post:sorce
            })
           }
        
        }
       fetch(columns[0].querySelector("a img").getAttribute("src")).then(res=>res.blob().then(res=>{
        console.log(res);
       }))
    
    

        console.log(count);
      }, 10000);
    
    
    

    
    }, 10000);
  }
});
