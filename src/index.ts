import * as PIXI from 'pixi.js'

const app = new PIXI.Application()

document.body.appendChild(app.view)

const textStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fill: ['#ffffff', '#ffffff'], // gradient
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

type Comment = {
    id: number,
    text: string,
    isFetched: boolean
}

let commentSet: Set<PIXI.Text> = new Set

const comments = [{id: 1, text: 'test', isFetched: false}]

app.ticker.add(() => {
    const renderedComments = fetchRenderedComment()

    addText(renderedComments)

    commentSet.forEach(updatePosition)
})

const fetchRenderedComment = (): Comment[] => {
    const renderedComments: Comment[] = []
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i]

        if (!comment.isFetched) {
            comment.isFetched = true
            renderedComments.push(comment)
        }
    }

    return renderedComments
}

const addText = (comments: Array<Comment>) => {
    comments.forEach(comment => {
        const text = new PIXI.Text(comment.text, textStyle)
        commentSet.add(text)
        text.x = app.view.clientWidth
        text.y = 0
        app.stage.addChild(text)
    })
}

const updatePosition = (commentObj: PIXI.Text) => {
    console.log(commentObj)
    const moveDiff = -3
    commentObj.x += moveDiff

    if (commentObj.x < -commentObj.width) {
        commentObj.destroy()
        commentSet.delete(commentObj)
    }
}
