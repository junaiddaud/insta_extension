let check=false;
let apiUrl = "http://127.0.0.1:5000/";
chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  console.log(check,"update");
 
  if (changeInfo.status != 'complete')
      return;  
      if (check && tab.url.includes("instagram.com")) {
        console.log("New tab created by the extension:", tab);
        check=false;
      
     let res=await   chrome.tabs.sendMessage(tab.id, {action: "scrape"}); 
     console.log(res);


      }
  // if (tab.url.indexOf('linked.com') != -1) {
  //     chrome.tabs.executeScript(tabId, {
  //         code: 'alert(1)'
  //     });
  // }
});
chrome.tabs.onCreated.addListener(async function(tab) {
  // This event is triggered when any new tab is created
  // Check if the tab was created by your extension
  let data = await chrome.storage.local.get(["instaPosturl"]);
  console.log(data.instaPosturl,tab.openerTabId === undefined ,tab.url.includes(data?.instaPosturl),data.instaPosturl,tab)
  if (tab.openerTabId === undefined && tab.pendingUrl.includes(data?.instaPosturl)) {
    // This tab was created programmatically by your extension
  
    check=true;
    console.log(check,"junaid",data);
    
    // You can perform actions specific to tabs created by your extension here
  }
});

