import { json, templateUser } from "./json.js"

/**
 * @template
 * @type {Element}
 * @typedef {Element}
 */
const template = document.getElementById('templateUser').content
const fragment = document.createDocumentFragment()
const mainContainer = document.querySelector('main.main__cntnr')


json.comments.forEach(json => {
    const cloneNode = importTemplate(document.importNode(template, true), json)
    fragment.append(cloneNode)

    const section = document.createElement('section')
    section.classList.add('sctn__replies','cntnr--flx', 'flx--clmn','flx--rw-gp-2')

    json.replies.map(sub => {
        const subClone = document.importNode(template, true)
        section.append(importTemplate(subClone, sub))
    })
    if(section.childElementCount !== 0) 
        fragment.append(section)
    
})
mainContainer.append(fragment)



/**
 * 
 * @param {Element} nodeTemplate 
 * @param {JSON} json 
 */
function importTemplate(nodeTemplate, json) {
    if(json.user.username == 'juliusomo') {
        nodeTemplate.querySelector('.user__plus + figure').innerHTML = templateUser()
    }
    nodeTemplate.querySelector('img.user__img').src = json.user.images
    nodeTemplate.querySelector('figcaption h2').textContent = json.user.username
    nodeTemplate.querySelector('figcaption p').textContent = json.createdAt  
    nodeTemplate.querySelector('.artcl__user > p').innerHTML = `${innerReplyingTo(json.replyingTo)} ${json.content}`
    nodeTemplate.querySelector('.user__plus p').textContent = json.score
    return nodeTemplate;
}

/**
 * 
 * @param {String} content value of json
 * @returns {String} template string that have the structure of a paragraph
 */
function innerReplyingTo(content) {
    return content? `<p class = 'elmnt--inline fnt--700 clr--prpl'>@${content}</p>` : ``
}

