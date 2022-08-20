// import express from "express"
// import axios from "axios"
// import * as cheerio from "cheerio"
// import * as path from "path"

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

const api_url = "http://api.mediastack.com/v1/news?access_key=16408fd08347dc9645dd84d7eb86adb9&keywords=business&countries=us,gb,de"

const guardian_url = "https://www.theguardian.com/international"

const app = express()
const PORT = 5000

const setDefaultVal = (val,replacer) =>{
    if(val==="" || val===undefined)val=`${replacer}`
    return val
}

app.use(express.static('public'))

app.listen(PORT,()=>console.log(`listening on port http://localhost:${PORT}/`))

app.get('/api', async (req, res) => {

    // fetching data from the server

    var page = Math.floor(Math.random() * 7) + 1
    const ndtv_url = `https://www.ndtv.com/latest/page-${page}`
    const fetchApi = await axios(ndtv_url)
    const html = await fetchApi.data
    const html_data = await cheerio.load(html) 
    
    const articles = []
    
    // actual web scraping results in an array
    html_data(".news_Itm",html).each(function(){   //  cheerio cant use arrow functions, hence we need to create normal function
        var title = html_data(this).find(".news_Itm-cont").find('a').text()
        const content = html_data(this).find(".news_Itm-cont").find('p').text()
        const source = html_data(this).find(".news_Itm-cont").find('a').attr('href')
        const imgUrl = html_data(this).find(".news_Itm-img").find('img').attr('src')
        // pushing objects into the list
        articles.push({
            title:setDefaultVal(title,"High School DxD Season is back with Season 5 – There are more Demons!"), 
            content:setDefaultVal(content,"The Japanese light novel series, High School DxD, written by Ichiei Ishibumi, got huge applause from the audience. The anime adaptation will focus on Issei’s continued efforts to become a powerful Devil, as well as his relationships with the girls in his harem. There’s sure to be plenty of drama, laughs, and fan service in store for us!If you are a die-heart fan of this series, make sure to scroll down for the juicy information about the High School DxD Season 5!"), 
            source:setDefaultVal(source,"https://www.readersfusion.com/entertainment/there-are-more-demons-high-school-dxd-season-is-back-with-season-5/"), 
            imgUrl:setDefaultVal(imgUrl,"https://sotaku.com/wp-content/uploads/2016/03/top-10-sexy-high-school-dxd-characters.jpg")
        })
    })

    // console.log(articles)

    res.json(articles)
})