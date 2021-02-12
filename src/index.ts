import * as PIXI from 'pixi.js'
import CommentRenderer from './comment/CommentRenderer'

const app = new PIXI.Application()

document.getElementById('content')?.appendChild(app.view)

const commentRenderer = new CommentRenderer(app)

commentRenderer.render()

const commentForm = document.getElementById('comment_form');

commentForm?.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputComment = document.getElementById('input_comment') as HTMLInputElement

    let comment = inputComment.value
    commentRenderer.addComment(comment)
    inputComment.value = ''
})
