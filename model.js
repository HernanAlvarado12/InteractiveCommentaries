import { json, replyTemplate, userTemplate } from "./json.js"

/**
 * @template
 * @type {Element}
 * @typedef {Element}
 */
const template = document.getElementById('templateUser').content
let parentNode
let replying
const fragment = document.createDocumentFragment()
const mainContainer = document.querySelector('main.main__cntnr')


document.addEventListener('click', event => {
    if (event.target.matches('.delete')) {
        modalMain(event)
    }else if(event.target.matches('.cancel__bttn')) {
        mainFilter()
    }else if(event.target.matches('.delete__bttn')) {
        parentElement(parentNode, 'artcl__user').remove()
        mainFilter()
    }else if(event.target.matches('.plus:not(.test)')) {
        plusCount(event, +1)
    }else if(event.target.matches('.minus:not(.test)')) {
        plusCount(event, -1)
    }else if(event.target.matches('.user__plus + figure > :is(figcaption, img):not(.test)')) {
        replyMessage(event.target)
    }else if(event.target.matches('.artcl__reply .reply--cancel')) {
        parentElement(event.target, 'artcl__reply').remove()
    }else if(event.target.matches('.artcl__reply .reply--okay')) {
        addReply(event)
    }else if(event.target.matches('.footer__bttn')) {
        addComment(event)
    }
})


document.addEventListener('mouseover', event => {
    if(event.target.matches('.elmnt--opacity, .edit, .delete, .plus, .minus, .footer__bttn')) {
        if(mainContainer.classList.contains('main--filter-1')) {
            event.target.classList.add('test')
        }else{
            event.target.classList.remove('test')
        }
    }
})


json.comments.forEach(json => {
    const cloneNode = importTemplate(document.importNode(template, true), json)
    fragment.append(cloneNode)

    const section = document.createElement('section')
    section.classList.add('sctn__replies','cntnr--wdth-100','cntnr--flx', 'flx--clmn','flx--rw-gp-2')
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
 * @param {Event} event 
 */
function addComment(event) {
    const commentary = valueCommentary({target: event, classParent: 'footer__cntnr', textClass: '.footer__text', origin: ''})
    commentary != undefined? mainContainer.append(commentary.firstElementChild) : ''
}


/**
 * 
 * @param {Event} event 
 */
function addReply(event) {
    const parentNode = parentElement(event.target, 'artcl__reply')
    const commentary = valueCommentary({target: event, classParent: 'artcl__reply', textClass: '.reply__text', origin: replying.querySelector('h2').textContent})
    commentary != undefined? parentNode.replaceWith(commentary.firstElementChild) : '';
}

/**
 * 
 * @param {Event} target
 */
function valueCommentary({target, classParent, textClass, origin}) {
    const cloneTemplate = document.importNode(template, true)
    const parentNode = parentElement(target.target, classParent)
    const textValue = parentNode.querySelector(textClass)
    const textCommentary = textValue.value
    textValue.value = ''
    if(textCommentary.length !== 0) {
        return importTemplate(cloneTemplate, {
            content: textCommentary,
            createdAt: '1 minute ago',
            score: 0,
            replyingTo: origin,
            user: { username: 'juliusomo', images: './assets/juliusomo.png'}
        })
    }
}


/**
 * 
 * @param {Element} nodeTemplate 
 * @param {JSON} json 
 * @returns {Element}
 */
function importTemplate(nodeTemplate, json) {
    if(json.user.username == 'juliusomo') {
        nodeTemplate.querySelector('figcaption h2').insertAdjacentHTML('afterend', `<p class ='user__me fnt--700 clr--wht bckgrnd--blue'>you</p>`)
        nodeTemplate.querySelector('.user__plus + figure').innerHTML = userTemplate()
        nodeTemplate.querySelector('.user__plus + figure').classList.add('flx--wrap')
    }
    nodeTemplate.querySelector('img.user__img').src = json.user.images
    nodeTemplate.querySelector('figcaption h2').textContent = json.user.username
    nodeTemplate.querySelector('figcaption p.fnt--400').textContent = json.createdAt  
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
    return content? `<p class = 'fnt--700 clr--prpl' style ='display:inline-block'>@${content}</p>` : ``
}


/**
 * 
 * @param {Element} currentNode 
 */
function replyMessage(currentNode){
    const parent = parentElement(currentNode, 'artcl__user')
    const findReply = document.querySelector('.artcl__reply')
    if(findReply)
        findReply.remove()
    if(parent.nextElementSibling && !parent.nextElementSibling.classList.contains('artcl__reply')) {
        insertReply(parent)
    }else {
        insertReply(parent)
    }
}


/**
 * 
 * @param {Element} currentNode 
 */
function insertReply(currentNode) {
    replying = currentNode
    currentNode.insertAdjacentHTML('afterend', replyTemplate())
}


/**
 * 
 * @param {Event} event 
 */
function modalMain(event) {
    parentNode = event.target
    mainContainer.classList.add('main--filter-1')
    const delet = document.querySelector('.sctn__delete')
    delet.classList.add('elmnt--blck')
    delet.style = `top: calc(50% - ${(delet.getBoundingClientRect().height / 2)}px)`
}

/**
 * 
 */
function mainFilter() {
    mainContainer.classList.remove('main--filter-1')
    document.querySelector('.sctn__delete').classList.remove('elmnt--blck')
}


/**
 * 
 * @param {Event} event that origin the event
 * @param {Number} expresion number to plus the counter
 */
function plusCount(event, expresion) {
    const parent = parentElement(event.target, 'artcl__user')
    if (parent.querySelector('h2').textContent != 'juliusomo') {
        const score = parent.querySelector('.count')
        score.textContent = numberRound(Number(score.textContent) + expresion)
    }
}


/**
 * 
 * @param {Number} count current that have a commentary 
 * @returns {Number} counter 
 */
function numberRound(count) {
    return count < 0? 0 : count
}


/**
 * 
 * @param {Element} currentNode node of the event
 * @param {String} classList class that must have the node
 * @returns {Element} parent node with class
 */
function parentElement(currentNode, classList) {
    if(currentNode == document.body) {
        return null;
    }else {
        if(currentNode.classList.contains(classList)) {
            return currentNode;
        }else {
            return parentElement(currentNode.parentElement, classList);
        }
    }
}


//https://frontendmentor-w5qu.vercel.app/