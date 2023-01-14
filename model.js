import { json, templateUser } from "./json.js"

/**
 * @template
 * @type {Element}
 * @typedef {Element}
 */
const template = document.getElementById('templateUser').content
let parentNode
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
    }else if(event.target.matches('.plus')) {
        plusCount(event, +1)
    }else if(event.target.matches('.minus')) {
        plusCount(event, -1)
    }else if(event.target.matches('.user__plus + figure > :is(figcaption, img)')) {
        replyMessage(event.target)
    }
})

document.addEventListener('mouseover', event => {
    if(event.target.matches('.elmnt--opacity, .edit, .delete, .footer__bttn')) {
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
 * @param {Element} nodeTemplate 
 * @param {JSON} json 
 */
function importTemplate(nodeTemplate, json) {
    if(json.user.username == 'juliusomo') {
        nodeTemplate.querySelector('figcaption h2').insertAdjacentHTML('afterend', `<p class ='user__me fnt--700 clr--wht bckgrnd--blue'>you</p>`)
        nodeTemplate.querySelector('.user__plus + figure').innerHTML = templateUser()
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
    console.log(parent)
    let template = `<article class ="artcl__user cntnr--wdth">
                        <textarea class ="footer__text cntnr--wdth-100 fnt--mdm fnt--700 elmnt--rds" id ="" placeholder ="Add a comment..."></textarea>
                        <div class ="footer__send cntnr--flx flx--jstf-btwn">
                            <img class ="user__img elmnt--abslt" src ="./assets/juliusomo.png" alt ="" loading ="lazy" draggable ="false">
                            <button class ="footer__bttn clr--wht elmnt--abslt">Send</button>
                        </div>
                    </article>`
    const test = `<p>Entro a esta seccion</p>`
    parent.insertAdjacentHTML('afterend', template)
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