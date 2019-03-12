export default (element, direction) => {

    console.log('Element', element)

    let maxScroll = element.scrollWidth - element.clientWidth

    console.log('Max scroll => ', maxScroll)

    console.log(element.scrollLeft)

    let previous = element.scrollLeft

    let intervalRight = null, intervalLeft = null

    if(direction === 'right' && element.scrollLeft !== maxScroll){
        intervalRight = setInterval(() => {
            console.log('entra 1')
            element.scrollLeft += 3
            if(element.scrollLeft === maxScroll || element.scrollLeft > previous + 400){
                clearInterval(intervalRight)
                intervalRight = null
            }
        }, 1)
    } else if(direction === 'left' && element.scrollLeft !== 0) {
        intervalLeft = setInterval(() => {
            console.log('entra 2')
            element.scrollLeft -= 3
            if(element.scrollLeft === 0 || element.scrollLeft < previous - 400){
                clearInterval(intervalLeft)
                intervalLeft = null
            }
        }, 1)
    }

    return null
}