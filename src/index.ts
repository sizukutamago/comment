import * as PIXI from 'pixi.js'
import CommentRenderer from './comment/CommentRenderer'

const app = new PIXI.Application()

document.getElementById('content')?.appendChild(app.view)

const commentRenderer = new CommentRenderer(app)

commentRenderer.render()
