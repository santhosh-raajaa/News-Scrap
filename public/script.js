console.log("Starting")


const getApiData = async (parent) => {
    
    const newsCards = parent
    const response = await fetch('/api')
    const jsonData = await response.json()
    
    // adding images

    for(object of jsonData){
        var pacDiv = document.createElement('div')
        pacDiv.className = "news_card"
        var imgTag = document.createElement('img')
        imgTag.className = "news_img"
        var titleTag = document.createElement('h3')
        titleTag.className = "news_title"
        var contentTag = document.createElement('h5')
        contentTag.className = "news_content"
        
        imgTag.src = object.imgUrl
        titleTag.textContent = object.title
        contentTag.textContent = object.content
        pacDiv.appendChild(titleTag)
        pacDiv.appendChild(imgTag)
        pacDiv.appendChild(contentTag)

        newsCards.appendChild(pacDiv)

    }
    // console.log(newsCards)
}

const removeChildren = (parent) => {
    while (parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

const Refresh = () => {
    removeChildren(document.getElementById("news_cards"))
    getApiData(document.getElementById("news_cards"))
}

document.querySelector("#btn").addEventListener("click",()=>{
    removeChildren(document.getElementById("news_cards"))
    getApiData(document.getElementById("news_cards"))
})

window.onload = getApiData(document.getElementById("news_cards"))


