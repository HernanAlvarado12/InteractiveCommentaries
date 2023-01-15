const json = {
    currentUser: {
        username: 'juliusomo',
        images: './assets/juliusom.png'
    },
    comments: [
        {
            id: 1,
            content: `Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.`,
            createdAt: `1 month ago`,
            score: 12,
            user: {
                username: `amyrobson`,
                images: './assets/amyrobson.png'
            },
            replies: []
        },
        {
            id: 2,
            content: `Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!`,
            createdAt: `2 weeks ago`,
            score: 5,
            user: {
                username: `maxblagun`,
                images: `./assets/maxblagun.png`
            },
            replies: [
                {
                    id: 3,
                    content: `If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.`,
                    createdAt: `1 week ago`,
                    score: 4,
                    replyingTo: `maxblagun`,
                    user: {
                        username: `ramsesmiron`,
                        images: `./assets/ramsesmiron.png`
                    },
                    replies: []
                },
                {
                    id: 4,
                    content: `I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.`,
                    createdAt: `2 days ago`,
                    score: 2,
                    replyingTo: `ramsesmiron`,
                    user: {
                        username: `juliusomo`,
                        images: `./assets/juliusomo.png`
                    }
                }
            ]
        }
    ]
}

/**
 * 
 * @returns {String} template string
 */
function userTemplate() {
    return `<figure class = 'cntnr--flx flx-1'>
                <img class ='delete' src ='./assets/delete.svg' alt ='delete icon' loading ='lazy' draggable = 'false'>
                <figcaption class ='delete clr--red'>Delete</figcaption>
            </figure>
            <figure class ='cntnr--flx flx-1'>
                <img class ='edit' src ='./assets/edit.svg' alt ='edit icon' loading ='lazy' draggable ='false'>
                <figcaption class ='edit clr--prpl'>Edit</figcaption>
            </figure>
            <button class ='cancel__bttn edit--cancel clr--wht elmnt--none'>CANCEL</button>
            <button class ='edit__bttn clr--wht elmnt--none'>UPDATE</button>`
}

/**
 * 
 * @returns {String} template string
 */
function replyTemplate() {
    return `<article class ='artcl__reply cntnr--wdth-100'>
                <textarea class ='reply__text cntnr--wdth-100 fnt--mdm fnt--700 elmnt--rds' placeholder ='Add a comment...'></textarea>
                <div class ='reply__send cntnr--flx flx--jstf-btwn flx--clmn-gp-1'>
                    <img class ='user__img elmnt--abslt' src ='./assets/juliusomo.png' alt ='profile image' loading ='lazy' draggable ='false'>
                    <button class ='reply--okay reply__bttn clr--wht elmnt--opacity elmnt--abslt'>Reply</button>
                    <button class ='reply--cancel reply__bttn clr--wht elmnt--opacity elmnt--abslt bckgrnd--red'>Cancel</button>
                </div>
            </article>`
}

export {json, userTemplate, replyTemplate}