import * as PIXI from 'pixi.js'
import { Comment } from './types/Comment'


const textStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fill: ['#ffffff', '#ffffff'],
    stroke: '#000000',
    strokeThickness: 1,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 2,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 2,
    wordWrap: false,
    wordWrapWidth: 100
})

export default class CommentRenderer {
    private commentSet: Set<PIXI.Text>

    constructor(
        private app: PIXI.Application,
        private comments: Comment[] = [],
    ) {
        this.commentSet = new Set
    }

    addComment(commentText: string): void {
        this.comments.push(
            {
                id: this.comments.length,
                text: commentText,
                isFetched: false
            }
        )
    }

    render(): void {
        this.app.ticker.add(() => {
            const renderedComments = this.fetchRenderedComments()

            this.addText(renderedComments)

            this.commentSet.forEach(this.updatePosition.bind(this))
        })
    }

    private fetchRenderedComments(): Comment[] {
        const renderedComments: Comment[] = []
        for (let i = 0; i < this.comments.length; i++) {
            const comment = this.comments[i]

            if (!comment.isFetched) {
                comment.isFetched = true
                renderedComments.push(comment)
            }
        }

        return renderedComments
    }

    private addText(comments: Array<Comment>) {
        comments.forEach(comment => {
            const text = new PIXI.Text(comment.text, textStyle)
            this.commentSet.add(text)
            text.x = this.app.view.clientWidth
            text.y = 0
            this.app.stage.addChild(text)
        })
    }

    private updatePosition(commentObj: PIXI.Text) {
        const moveDiff = -3
        commentObj.x += moveDiff

        if (commentObj.x < -commentObj.width) {
            commentObj.destroy()
            this.commentSet.delete(commentObj)
        }
    }
}
