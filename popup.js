// adding a new bookmark row to the popup
const addNewBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};
const isEmpty= (string) =>{
    let regex = /^\s+$/;
  

    return regex.test(string) || string==="" 
}
document.addEventListener("DOMContentLoaded", () => {});
let btn=document.getElementById("btn");

btn.addEventListener('click',async()=>{
    let url=document.getElementById('path').value
 
    let posts=document.getElementById('posts').value

    const postObj={ 
     imgBox:document.getElementById('img').checked,
    
     vidBox:document.getElementById('vid').checked,
     }
     console.log(url,"junaid");
  if(isEmpty(url)){
    console.log("empty");
    document.getElementById("error").innerText="*Please insert url"
  }
 else if(isEmpty(posts)){
    console.log("empty");
    document.getElementById("error").innerText="*Please insert number of post"
  }
  else if(posts<0){
    document.getElementById("error").innerText="*Please insert valid number"
  }

  else{
    
    chrome.storage.local.set({ instaPost: posts,instaPostobj:postObj,instaPosturl:url }).then(() => {
        chrome.tabs.create({ url: url});
       });
  }
    
    // let url=document.getElementById('path').value
   
    
  
    

  
})

