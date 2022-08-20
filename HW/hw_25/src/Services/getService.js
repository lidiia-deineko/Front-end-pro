export const getColorService = () => {
    return Math.floor(Math.random() * 256)
}


export const getRandomHeight = () => {
    return Math.floor(Math.random() * (document.documentElement.clientHeight + 1))
}

export const getRandomWidth = () => {
    return Math.floor(Math.random() * (document.documentElement.clientWidth + 1))
}

