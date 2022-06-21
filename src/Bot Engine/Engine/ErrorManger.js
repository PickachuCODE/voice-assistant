function BotError(type) {
    if(type === undefined) return(console.warn('No TypeOf  error given'))
    if (type === 'confused') {
        return ('Sorry i did not get that')
    }
}

export {BotError}